import Link from "next/link";
import { CartProvider } from "@/components/CartProvider";
import CartBadge from "@/components/CartBadge";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Order delicious food in Addis Ababa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header className="site-header">
            <div className="container">
              <h1>
                <Link href="/" className="brand">
                  Addis Eats
                </Link>
              </h1>
              <nav className="site-nav">
                <Link href="/">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/checkout">Checkout</Link>
              </nav>
              <CartBadge />
            </div>
          </header>

          <main className="container">{children}</main>

          <footer className="site-footer">
            <div className="container">
              <p>© 2026 Addis Eats</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
