import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getDishBySlug, getDishSlugs } from "@/lib/dishes";

export function generateStaticParams() {
  return getDishSlugs().map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishBySlug(id);

  if (!dish) {
    return { title: "Dish not found", robots: { index: false, follow: false } };
  }

  const description = `${dish.name} — ${dish.price} ETB. ${dish.description}`;

  return {
    title: dish.name,
    description,
    alternates: { canonical: `/menu/${dish.slug}` },
    openGraph: {
      title: `${dish.name} · Addis Eats`,
      description,
      url: `/menu/${dish.slug}`,
      type: "website",
    },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishBySlug(id);

  if (!dish) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
    },
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/menu" className="text-purple-700 underline">
        ← Back to Menu
      </Link>

      <h1 className="mt-4 text-3xl font-bold">{dish.name}</h1>
      <p className="mt-2 text-gray-600">{dish.description}</p>

      {dish.image && (
        <Image
          src={dish.image}
          alt={dish.name}
          width={800}
          height={500}
          className="my-6 rounded-lg"
          priority
        />
      )}

      <p className="text-xl font-bold">{dish.price} ETB</p>
      <p className="mt-1 text-sm text-gray-500">Category: {dish.category}</p>
    </main>
  );
}
