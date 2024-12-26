import { WorkflowEntrypoint, WorkflowStep } from 'cloudflare:workers';
import type { WorkflowEvent } from 'cloudflare:workers';

type Env = {
  CUSTOMER_WORKFLOW: WorkflowEntrypoint<Env, Params>;
  DB: D1Database;
};

type Params = {
  id: string;
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const payload = await request.json();

    let instance = await env.CUSTOMER_WORKFLOW.create({
      params: payload,
    });

    return Response.json({
      id: instance.id,
      details: await instance.status(),
    });
  },
};

export class CustomerWorkflow extends WorkflowEntrypoint<Env, Params> {
  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {
    const { DB } = this.env;

    const customer = await step.do('fetch customer', async () => {
      const resp = await DB.prepare(`SELECT * FROM customers WHERE id = ?`)
        .bind(event.payload.id)
        .run();
      if (resp.success) return resp.results[0];
      return null;
    });

    if (customer) {
      await step.do('conditional customer step', async () => {
        console.log('Hello from a conditional step!');
      });
    }

    await step.do('example step', async () => {
      console.log('Hello from a step!');
    });
  }
}
