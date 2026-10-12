import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import PlaceOrderForm from "./PlaceOrderForm";

export const metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) redirect("/signin?next=/checkout");

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
      <PlaceOrderForm />
    </main>
  );
}
