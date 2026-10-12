import Link from "next/link";
import Providers from "./providers";
import AuthNav from "@/components/AuthNav";
import CartBadge from "@/components/CartBadge";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    template: "%s · Addis Eats",
    default: "Addis Eats — Ethiopian food delivery in Addis Ababa",
  },
  description: "Discover Ethiopian dishes from kitchens across Addis Ababa.",
  openGraph: {
    siteName: "Addis Eats",
    locale: "en_ET",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-gray-50 text-gray-900`}>
        <Providers>
          <header className="border-b bg-white">
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 p-4">
              <Link href="/" className="font-semibold hover:underline">
                Home
              </Link>
              <Link href="/menu" className="font-semibold hover:underline">
                Menu
              </Link>
              <Link href="/orders" className="font-semibold hover:underline">
                Orders
              </Link>
              <CartBadge />
              <AuthNav />
            </nav>
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
