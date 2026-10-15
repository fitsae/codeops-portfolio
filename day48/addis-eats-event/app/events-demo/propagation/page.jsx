"use client";

import { useState } from "react";

export default function PropagationDemo() {
  const [message, setMessage] = useState("Choose an action.");

  function openDish() {
    setMessage("Dish details opened.");
  }

  function addToCart(event) {
    event.stopPropagation();
    setMessage("Dish added to cart.");
  }

  return (
    <main className="wrap">
      <h1>Event Propagation</h1>

      <div onClick={openDish} className="panel" style={{ maxWidth: 360 }}>
        <h2>Doro Wat</h2>
        <p>Price: 450 ETB</p>
        <button type="button" onClick={addToCart} className="btn-primary">
          Add to cart
        </button>
      </div>

      <p aria-live="polite">{message}</p>

      <p className="muted">
        Note: in production, use a real link or button, not a clickable div. See{" "}
        <code>app/menu/page.js</code> for the correct pattern.
      </p>
    </main>
  );
}
