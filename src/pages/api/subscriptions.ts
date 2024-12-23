import { validateApiTokenResponse } from "@/lib/api";

export async function GET({ locals, params, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const { include_subscriptions } = params;

  const query = `SELECT * FROM subscriptions`;
  const response = await DB.prepare(query).all();

  if (response.success) {
    return Response.json({
      subscriptions: response.results
    });
  } else {
    return Response.json({ message: "Couldn't load subscriptions" }, { status: 500 });
  }
}

export async function POST({ locals, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const body = await request.json();

  // Create the subscription
  const subscriptionResponse = await DB.prepare(
    `INSERT INTO subscriptions (name, description, price) VALUES (?, ?, ?)`
  )
    .bind(body.name, body.description, body.price)
    .run();

  if (!subscriptionResponse.success) {
    return Response.json({ 
      message: "Failed to create subscription",
      status: false
    }, { status: 500 });
  }

  const subscriptionId = subscriptionResponse.meta.last_row_id;

  // Skip feature processing if no features provided
  if (!body.features?.length) {
    return Response.json(
      { 
        message: "Subscription created successfully",
        success: true
      }, 
      { status: 201 }
    );
  }

  // Prepare feature queries (insert + select pairs)
  const featureQueries = body.features.flatMap(feature => [
    DB.prepare(
      `INSERT OR IGNORE INTO features (name, description) VALUES (?, ?)`
    ).bind(feature.name, feature.description || null),
    DB.prepare(
      `SELECT id FROM features WHERE name = ?`
    ).bind(feature.name),
  ]);

  // Execute all feature queries in batch
  const featureResults = await DB.batch(featureQueries);

  // Prepare relationship queries
  const relationshipQueries = [];
  for (let i = 0; i < featureResults.length; i += 2) {
    const featureId = featureResults[i + 1].results[0].id;
    relationshipQueries.push(
      DB.prepare(
        `INSERT INTO subscription_features (subscription_id, feature_id) VALUES (?, ?)`
      ).bind(subscriptionId, featureId)
    );
  }

  // Execute relationship queries in batch if any exist
  if (relationshipQueries.length > 0) {
    const relationshipResults = await DB.batch(relationshipQueries);
    const relationshipFailed = relationshipResults.some(result => !result.success);
    if (relationshipFailed) {
      return Response.json({
        message: "Failed to create subscription-feature relationships",
        success: false
      }, { status: 500 });
    }
  }

  return Response.json({ message: "Subscription created successfully", success: true }, { status: 201 });
}

