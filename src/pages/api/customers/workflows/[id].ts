import { validateApiTokenResponse } from "@/lib/api";

type Params = {
  id: string;
};

export async function POST({ locals, request, params }: { locals: App.Locals; request: Request; params: Params }) {
  const { API_TOKEN, CUSTOMER_WORKFLOW } = locals.runtime.env;

  const invalidTokenResponse = await validateApiTokenResponse(request, API_TOKEN);
  if (invalidTokenResponse) return invalidTokenResponse;

  const { id } = params;
  await CUSTOMER_WORKFLOW.createInstance({ id });
  return Response.json({ success: true }, { status: 204 });
}
