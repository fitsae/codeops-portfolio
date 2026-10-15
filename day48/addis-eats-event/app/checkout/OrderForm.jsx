"use client";

import { useState } from "react";

export default function OrderForm() {
  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();

    if (pending) return; // guard against double submit

    setPending(true);
    setFieldErrors({});
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.status === 201) {
        const order = await res.json();
        setMessage(`Order ${order.id} placed.`);
        event.target.reset();
      } else if (res.status === 422) {
        const data = await res.json();
        setFieldErrors(data.fieldErrors || {});
        setMessage("Please fix the highlighted fields.");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    } catch {
      setMessage("Network error. Check your connection.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="panel" style={{ maxWidth: 480 }}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
        disabled={pending}
      />
      {fieldErrors.name && <p className="error">{fieldErrors.name[0]}</p>}

      <label htmlFor="phone">TeleBirr phone number</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="09... or +2519..."
        required
        disabled={pending}
      />
      {fieldErrors.phone && <p className="error">{fieldErrors.phone[0]}</p>}

      <label htmlFor="address">Address</label>
      <input
        id="address"
        name="address"
        type="text"
        autoComplete="street-address"
        required
        disabled={pending}
      />
      {fieldErrors.address && <p className="error">{fieldErrors.address[0]}</p>}

      <button type="submit" className="btn-primary" disabled={pending}>
        {pending ? "Placing order..." : "Place order"}
      </button>

      <p role="status" aria-live="polite" style={{ marginTop: 12 }}>
        {message}
      </p>
    </form>
  );
}
