"use client";

import { useCart } from "@/app/providers";
import { useState } from "react";

export default function AddToCartButton({ dish }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    add(dish);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="btn-primary"
      aria-label={`Add ${dish.name} to cart`}
    >
      {justAdded ? "Added ✓" : "Add to cart"}
    </button>
  );
}
