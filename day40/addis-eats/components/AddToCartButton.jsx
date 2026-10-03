"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ dish, label = "Add to Cart" }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem(dish);
    setJustAdded(true);
    // small visual ack — reset after 1s so the button is reusable
    setTimeout(() => setJustAdded(false), 1000);
  }

  return (
    <button
      type="button"
      className="btn add-to-cart"
      onClick={handleClick}
      aria-label={`Add ${dish.name} to cart`}
    >
      {justAdded ? "✓ Added" : label}
    </button>
  );
}
