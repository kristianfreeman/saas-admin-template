import { validateApiTokenResponse } from "@/lib/api";

export async function GET({ locals, params, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const query = `SELECT * FROM customer_subscriptions`;
  const response = await DB.prepare(query).all();

  if (response.success) {
    return Response.json({
      customer_subscriptions: response.results
    });
  } else {
    return Response.json({ message: "Couldn't load customer subscriptions" }, { status: 500 });
  }
}

export async function POST({ locals, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const body = await request.json();
  const query = `INSERT INTO customer_subscriptions (customer_id, subscription_id, subscription_ends_at) VALUES (?, ?, ?)`;
  const defaultSubscriptionEndsAt = Date.now() + (60 * 60 * 24 * 30);
  const response = await DB
    .prepare(query)
    .bind(body.customer_id, body.subscription_id, body.subscription_ends_at || defaultSubscriptionEndsAt)
    .run();

  if (response.success) {
    return Response.json({ message: "Customer subscription created successfully", success: true }, { status: 201 });
  } else {
    return Response.json({ message: "Couldn't create customer subscription", success: false }, { status: 500 });
  }
}
