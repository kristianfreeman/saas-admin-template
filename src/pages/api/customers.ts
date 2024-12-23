import { validateApiTokenResponse } from "@/lib/api";

export async function GET({ locals, params, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const { include_subscriptions } = params;

  let query
  if (include_subscriptions) {
    query = `SELECT * FROM customers JOIN subscriptions ON customers.id = subscriptions.customer_id`;
  } else {
    query = `SELECT * FROM customers`;
  }

  const response = await DB.prepare(query).all();

  if (response.success) {
    return Response.json({
      customers: response.results
    });
  } else {
    return Response.json({ message: "Couldn't load customers" }, { status: 500 });
  }
}

export async function POST({ locals, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const body = await request.json();
  const query = `INSERT INTO customers (name, email, notes) VALUES (?, ?, ?)`;
  const response = await DB.prepare(query).bind(body.name, body.email, body.notes).run();
  if (response.success) {
    return Response.json({ message: "Customer created successfully", success: true }, { status: 201 });
  } else {
    return Response.json({ message: "Couldn't create customer", success: false }, { status: 500 });
  }
}
