import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishById, getDishes } from "@/lib/dishes";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDishById(id);

  if (!dish) notFound();

  return (
    <article className="dish-detail">
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <p>
        <strong>{dish.price} ETB</strong>
      </p>

      <div className="dish-actions">
        <AddToCartButton
          dish={dish}
          label={`Add ${dish.name} — ${dish.price} ETB`}
        />
        <Link href="/menu" className="btn btn-outline">
          Back to Menu
        </Link>
      </div>
    </article>
  );
}
