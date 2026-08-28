import { useState } from "react";

function DeliveryForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const validPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validPhone) {
      return;
    }

    console.log("Delivery information:", form);

    alert("Delivery information submitted successfully!");
  };

  return (
    <section className="delivery">
      <h2>Delivery Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">TeleBirr Phone Number</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="09... or +2519..."
            required
          />

          {form.phone && !validPhone && (
            <p className="err">Use 09... or +2519...</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="area">Delivery Area</label>

          <input
            id="area"
            name="area"
            type="text"
            value={form.area}
            onChange={handleChange}
            placeholder="e.g. Bole"
            required
          />
        </div>

        <button type="submit" disabled={!validPhone}>
          Pay with TeleBirr
        </button>
      </form>
    </section>
  );
}

export default DeliveryForm;
