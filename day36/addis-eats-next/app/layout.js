import Link from "next/link";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Delicious Ethiopian food delivered to your door.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <nav className="main-nav">
          <div className="container nav-content">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/checkout">Checkout</Link>
          </div>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
