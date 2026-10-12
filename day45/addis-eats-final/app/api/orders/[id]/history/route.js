import { orderHistory } from "@/lib/order-history";

export async function GET(request, { params }) {
  const { id } = await params;
  const history = orderHistory[id] ?? [];
  return Response.json(history);
}
