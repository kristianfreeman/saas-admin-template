import { validateApiTokenResponse } from "@/lib/api";

export async function GET({ locals, params, request }) {
  const { id } = params;
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
    WHERE customers.id = ?
  `;

  const response = await DB.prepare(query).bind(id).all();

  if (response.results.length === 0) {
    return Response.json({ message: "Customer not found" }, { status: 404 });
  }

  if (response.success) {
    const customer = Object.assign({}, response.results[0]);

    if (customer.subscription_id) {
      customer.subscription = {
        id: customer.subscription_id,
        status: customer.subscription_status
      };

      delete customer.subscription_id;
      delete customer.subscription_status;
    }

    return Response.json({ customer: customer });
  } else {
    return Response.json({ message: "Couldn't load customer" }, { status: 500 });
  }
}
