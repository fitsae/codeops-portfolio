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
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-4xl font-bold">Addis Eats</h1>
      <p className="mb-6 text-gray-600">
        Ethiopian food delivered to your door.
      </p>

      <p className="mb-8">
        <Link href="/menu" className="text-purple-700 underline">
          Go to the searchable menu →
        </Link>
      </p>

      <h2 className="mb-4 text-2xl font-semibold">Featured dishes</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dishes.slice(0, 3).map((dish) => (
          <article
            key={dish.id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <h3 className="text-xl font-semibold">{dish.name}</h3>
            <p className="mt-2 text-gray-600">{dish.description}</p>
            <p className="mt-4 font-bold">{dish.price} ETB</p>
          </article>
        ))}
      </div>
    </main>
  );
}
