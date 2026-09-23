import Link from "next/link";
import CartPanel from "@/components/CartPanel";

export const metadata = { title: "Cart · Addis Eats" };

export default function CartPage() {
  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      <CartPanel />
      <Link href="/checkout" className="primary-link">
        Go to Checkout →
      </Link>
    </section>
  );
}
