import { getOrder } from "@/lib/orders-api";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold">Order not found</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Order Status</h1>
      <OrderStatus id={id} initialOrder={order} />
    </main>
  );
}
