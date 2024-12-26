import { validateApiTokenResponse } from "@/lib/api";

export async function GET({ locals, params, request }) {
  const { id } = params;
  const { API_TOKEN, DB } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const query = `
    SELECT * FROM subscriptions WHERE id = ?
  `;

  const response = await DB.prepare(query).bind(id).all();

  if (!response.success) {
    return Response.json({ message: "Couldn't load subscription" }, { status: 500 });
  }

  if (response.results.length === 0) {
    return Response.json({ message: "Subscription not found" }, { status: 404 });
  }

  return Response.json({ subscription: response.results[0] });
}
