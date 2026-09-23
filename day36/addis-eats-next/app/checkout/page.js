import CartPanel from "@/components/CartPanel";
import DeliveryForm from "@/components/DeliveryForm";

export const metadata = { title: "Checkout · Addis Eats" };

export default function CheckoutPage() {
  return (
    <section className="checkout-page">
      <h2>Checkout</h2>
      <CartPanel />
      <DeliveryForm />
    </section>
  );
}
