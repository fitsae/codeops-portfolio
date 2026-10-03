export async function POST(request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, phone } = body;

  if (!name || !phone) {
    return Response.json(
      { error: "Name and phone are required." },
      { status: 422 },
    );
  }

  if (!/^09\d{8}$/.test(phone)) {
    return Response.json(
      { error: "Phone must be a valid Ethiopian number." },
      { status: 422 },
    );
  }

  return Response.json(
    { message: "Order created successfully." },
    { status: 201 },
  );
}
