import Link from "next/link";
import { dishes } from "@/lib/dishes";
export const metadata = {
  title: "Home",
  description:
    "Order Ethiopian dishes — Kitfo, Doro Wot, Tibs, Shiro — delivered across Addis Ababa.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="home">
      <h1>Addis Eats</h1>
      <p>Track your food delivery from the restaurant to your door.</p>
      <Link href="/menu">Browse the menu</Link>
      {" · "}
      <Link href="/track/AE-1042">Track order AE-1042</Link>
    </main>
  );
}
