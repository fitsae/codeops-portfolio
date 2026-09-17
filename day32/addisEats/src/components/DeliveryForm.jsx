// src/components/DeliveryForm.jsx
import { useState } from "react";
import {
  useCartStore,
  selectItems,
  selectTotal,
  selectClear,
} from "../store/cartStore";

function DeliveryForm() {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const clear = useCartStore(selectClear);

  const validPhone = /^(?:\+251|0)9\d{8}$/.test(phone);

  function handleSubmit(e) {
    e.preventDefault();
    if (!validPhone || !address.trim() || items.length === 0) return;
    alert(`Order submitted successfully!\nTotal: ${total} ETB`);
    clear();
    setPhone("");
    setAddress("");
  }

  return (
    <section className="delivery-form">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone">TeleBirr Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="09XXXXXXXX"
          />
          {!validPhone && phone.length > 0 && (
            <p className="error-message">
              Enter a valid Ethiopian phone number.
            </p>
          )}
        </div>
        <div>
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your delivery address"
          />
        </div>
        <p>
          Order Total: <strong>{total} ETB</strong>
        </p>
        <button
          type="submit"
          disabled={!validPhone || !address.trim() || items.length === 0}
        >
          Pay with TeleBirr
        </button>
      </form>
    </section>
  );
}

export default DeliveryForm;
