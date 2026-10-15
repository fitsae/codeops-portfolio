import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Addis Eats",
    template: "%s | Addis Eats",
  },
  description: "Discover delicious meals and order from Addis Eats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
