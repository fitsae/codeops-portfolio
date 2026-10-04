import Link from "next/link";
import Providers from "./providers";
import { getSession } from "@/lib/session";
import "./globals.css";

export const metadata = {
  title: "Addis Eats",
  description: "Ethiopian food ordering application",
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <header className="border-b bg-white">
            <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 p-4">
              <Link href="/" className="font-semibold hover:underline">
                Home
              </Link>
              <Link href="/menu" className="font-semibold hover:underline">
                Menu
              </Link>
              <Link href="/cart" className="font-semibold hover:underline">
                Cart
              </Link>
              <Link href="/orders" className="font-semibold hover:underline">
                Orders
              </Link>

              {session?.role === "staff" && (
                <Link href="/kitchen" className="font-semibold hover:underline">
                  Kitchen
                </Link>
              )}

              <span className="ml-auto flex items-center gap-4">
                {session ? (
                  <>
                    <span className="text-sm text-gray-500">
                      {session.email}
                    </span>
                    <form action="/api/signout" method="post">
                      <button
                        type="submit"
                        className="rounded-lg border px-3 py-1 text-sm"
                      >
                        Sign out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/signin"
                    className="font-semibold hover:underline"
                  >
                    Sign in
                  </Link>
                )}
              </span>
            </nav>
          </header>

          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
