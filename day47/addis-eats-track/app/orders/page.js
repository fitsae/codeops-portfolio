import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/orders";
import CancelOrderButton from "./CancelOrderButton";
// add at the top of the file, above the component
export const metadata = {
  title: "My Orders",
  robots: { index: false, follow: false },
};
export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=/orders");

  const userOrders = getOrdersFor(session.userId);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-2 text-3xl font-bold">My Orders</h1>
      <p className="mb-6 text-gray-600">
        Signed in as: {session.email} ({session.role})
      </p>

      {userOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <article key={order.id} className="rounded-xl border bg-white p-5">
              <h2 className="text-xl font-semibold">{order.item}</h2>
              <p className="mt-1 text-gray-600">Status: {order.status}</p>
              {order.status !== "Cancelled" && (
                <CancelOrderButton orderId={order.id} />
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
