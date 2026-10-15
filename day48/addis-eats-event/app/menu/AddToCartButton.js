"use client";

import { useState } from "react";
import { mutate } from "swr";

export default function AddToCartButton({ dish, price }) {
  const [pending, setPending] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: dish.id,
          slug: dish.slug,
          name: dish.name,
          price: dish.price,
        }),
      });

      // Tell SWR to refetch /api/cart — CartBadge updates instantly.
      mutate("/api/cart");

      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    } catch (err) {
      console.error("Add to cart failed:", err);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="rounded-lg bg-purple-600 px-4 py-2 text-white text-sm disabled:opacity-50"
    >
      {pending ? "Adding…" : justAdded ? "✓ Added" : "Add to Cart"}
    </button>
  );
}
