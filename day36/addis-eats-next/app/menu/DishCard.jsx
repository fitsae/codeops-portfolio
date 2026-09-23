"use client";

import Link from "next/link";
import { useCartStore, selectAddItem } from "@/store/cartStore";

export default function DishCard({ dish }) {
  const addItem = useCartStore(selectAddItem);

  return (
    <article className="dish-card">
      <h3>
        <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
      </h3>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>
      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}

      <div className="dish-actions">
        <Link href={`/menu/${dish.id}`} className="details-link">
          View Details
        </Link>
        <button type="button" onClick={() => addItem(dish)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}
