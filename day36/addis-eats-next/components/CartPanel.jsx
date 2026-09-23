"use client";

import Link from "next/link";
import {
  useCartStore,
  selectItems,
  selectTotal,
  selectRemove,
  selectClear,
} from "@/store/cartStore";
import { useHydrated } from "@/lib/useHydrated";

export default function CartPanel() {
  const hydrated = useHydrated();
  const items = useCartStore(selectItems);
  const total = useCartStore(selectTotal);
  const remove = useCartStore(selectRemove);
  const clear = useCartStore(selectClear);

  if (!hydrated) return <p>Loading cart…</p>;

  if (items.length === 0) {
    return (
      <section className="cart-panel">
        <h3>Your cart is empty.</h3>
        <Link href="/menu">Browse the menu →</Link>
      </section>
    );
  }

  return (
    <section className="cart-panel">
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <strong>{item.name}</strong>
              <p>
                {item.price} ETB × {item.quantity}
              </p>
            </div>
            <div>
              <span>{item.price * item.quantity} ETB</span>
              <button type="button" onClick={() => remove(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3>Total: {total} ETB</h3>
      <button type="button" onClick={clear}>
        Clear Cart
      </button>
    </section>
  );
}
