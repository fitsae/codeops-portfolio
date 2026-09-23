import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "@/lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((d) => ({ id: String(d.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = getDishById(id);
  return { title: dish ? `${dish.name} · Addis Eats` : "Dish not found" };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) notFound();

  return (
    <section className="dish-details">
      <h2>{dish.name}</h2>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>
      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
      <p>
        ID (from props): <code>{id}</code>
      </p>
      <Link href="/menu" className="details-link">
        ← Back to Menu
      </Link>
    </section>
  );
}
