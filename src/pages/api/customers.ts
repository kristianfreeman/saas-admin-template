export async function GET({ locals, params }) {
  const { DB } = locals.runtime.env;
  const query = `SELECT * FROM customers`;
  const response = await DB.prepare(query).all();
  if (response.success) {
    return Response.json({
      customers: response.results
    });
  } else {
    return Response.json("Couldn't load customers", { status: 500 });
  }
}

export async function POST({ locals, request }) {
  const { DB } = locals.runtime.env;
  const body = await request.json();
  const query = `INSERT INTO customers (name, email, notes) VALUES (?, ?, ?)`;
  const response = await DB.prepare(query).bind(body.name, body.email, body.notes).run();
  if (response.success) {
    return Response.json({ message: "Customer created successfully" }, { status: 201 });
  } else {
    return Response.json("Couldn't create customer", { status: 500 });
  }
}
