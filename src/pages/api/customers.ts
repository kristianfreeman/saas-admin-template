import { validateApiTokenResponse } from "@/lib/api";

export async function GET({ locals, request }) {
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const query = `
    SELECT 
      customers.*,
      customer_subscriptions.id as subscription_id,
      customer_subscriptions.status as subscription_status
    FROM customers 
    LEFT JOIN customer_subscriptions 
      ON customers.id = customer_subscriptions.customer_id
  `;

  const response = await DB.prepare(query).all();

  if (response.success) {
    const formattedResults = response.results.map(row => {
      const customer = { ...row };

      if (row.subscription_id) {
        customer.subscription = {
          id: row.subscription_id,
          status: row.subscription_status
        };
      }

      delete customer.subscription_id;
      delete customer.subscription_status;
      return customer;
    });

    return Response.json({ customers: formattedResults });
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
