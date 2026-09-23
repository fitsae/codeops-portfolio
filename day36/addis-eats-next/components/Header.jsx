"use client";

import Link from "next/link";
import { useCartStore, selectItemCount } from "@/store/cartStore";
import { useHydrated } from "@/lib/useHydrated";

export default function Header() {
  const itemCount = useCartStore(selectItemCount);
  const hydrated = useHydrated();

  return (
    <header className="header">
      <div className="container header-content">
        <div>
          <h1>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Addis Eats
            </Link>
          </h1>
          <p>Delicious Ethiopian food delivered to your door.</p>
        </div>
        <div className="cart-badge">
          🛒 Cart <span>{hydrated ? itemCount : 0}</span>
        </div>
      </div>
    </header>
  );
}
