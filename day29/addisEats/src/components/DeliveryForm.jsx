import { useState } from "react";

function DeliveryForm() {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const validPhone = /^(?:\+251|0)9\d{8}$/.test(phone);

  function handleSubmit(event) {
    event.preventDefault();

    if (!validPhone) {
      return;
    }

    alert("Order submitted successfully!");
  }

  return (
    <section className="delivery-form">
      <h2>Delivery Information</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone">TeleBirr Phone Number</label>

          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
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
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Enter your delivery address"
          />
        </div>

        <button type="submit" disabled={!validPhone || !address.trim()}>
          Pay with TeleBirr
        </button>
      </form>
    </section>
  );
}

export default DeliveryForm;
