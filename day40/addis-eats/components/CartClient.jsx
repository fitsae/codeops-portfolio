"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartClient() {
  const { items, total, itemCount, removeItem, clear, hydrated } = useCart();

  // Until localStorage has been read, don't guess the cart contents.
  if (!hydrated) {
    return <p>Loading cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <p>Your cart is empty.</p>
        <Link href="/menu" className="btn">
          Browse the menu →
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      {items.map((item) => (
        <article key={item.id} className="cart-item">
          <div>
            <h3>{item.name}</h3>
            <p>
              {item.quantity} × {item.price} ETB
            </p>
          </div>
          <div className="cart-item-actions">
            <span>
              <strong>{item.price * item.quantity} ETB</strong>
            </span>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => removeItem(item.id)}
            >
              Remove one
            </button>
          </div>
        </article>
      ))}

      <div className="cart-summary">
        <h3>
          Total ({itemCount} items): {total} ETB
        </h3>
        <div className="cart-summary-actions">
          <button type="button" className="btn btn-outline" onClick={clear}>
            Clear Cart
          </button>
          <Link href="/checkout" className="btn">
            Go to Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
}
