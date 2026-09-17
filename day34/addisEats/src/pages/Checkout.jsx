// src/pages/Checkout.jsx  (updated)
import CartPanel from "../components/CartPanel";
import DeliveryForm from "../components/DeliveryForm";
import ErrorBoundary from "../components/ErrorBoundary";

function Checkout() {
  return (
    <section className="checkout-page">
      <h2>Checkout</h2>

      {/* Cart boundary — a bad cart can't take the form down with it */}
      <ErrorBoundary
        label="Cart"
        fallback={({ error, reset }) => (
          <section className="cart-panel error-boundary" role="alert">
            <h3>Your cart hit a snag.</h3>
            <p>{error.message}</p>
            <button type="button" onClick={reset}>
              Restore cart
            </button>
          </section>
        )}
      >
        <CartPanel />
      </ErrorBoundary>

      {/* Independent boundary — the form stays usable even if the cart died */}
      <ErrorBoundary label="Checkout form">
        <DeliveryForm />
      </ErrorBoundary>
    </section>
  );
}

export default Checkout;
