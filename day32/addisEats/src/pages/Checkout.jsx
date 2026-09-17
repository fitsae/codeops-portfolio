import CartPanel from "../components/CartPanel";
import DeliveryForm from "../components/DeliveryForm";

function Checkout() {
  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      <CartPanel />

      <DeliveryForm />
    </section>
  );
}

export default Checkout;
