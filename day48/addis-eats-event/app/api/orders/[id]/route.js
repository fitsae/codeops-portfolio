import { orders } from "@/lib/orders";

export async function GET(request, { params }) {
  const { id } = await params; // Next 15: params is a Promise
  const order = orders[id];

  if (!order) {
    return Response.json({ message: "Order not found" }, { status: 404 });
  }

  return Response.json(order);
}
