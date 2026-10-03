"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartBadge() {
  const { itemCount, hydrated } = useCart();

  return (
    <Link
      href="/cart"
      className="cart-badge"
      aria-label={`Cart, ${itemCount} items`}
    >
      🛒 <span>{hydrated ? itemCount : 0}</span>
    </Link>
  );
}
