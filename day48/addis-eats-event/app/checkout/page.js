import OrderForm from "./OrderForm";

export const metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <main className="wrap">
      <h1>Checkout</h1>
      <p>Enter the contact details for your order.</p>
      <OrderForm />
    </main>
  );
}
