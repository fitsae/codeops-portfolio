import Link from "next/link";
import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian food ordering application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <header className="border-b bg-white">
            <nav className="mx-auto flex max-w-6xl gap-6 p-4">
              <Link href="/" className="font-semibold hover:underline">
                Home
              </Link>
              <Link href="/menu" className="font-semibold hover:underline">
                Menu
              </Link>
              <Link href="/cart" className="font-semibold hover:underline">
                Cart
              </Link>
              <Link
                href="/orders/1001"
                className="font-semibold hover:underline"
              >
                Order 1001
              </Link>
              <Link
                href="/orders-tq/1001"
                className="font-semibold hover:underline"
              >
                Order (TQ)
              </Link>
            </nav>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
