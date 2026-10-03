import Link from "next/link";
import { getDishes } from "@/lib/dishes";
import AddToCartButton from "@/components/AddToCartButton";

export default async function MenuPage({ searchParams }) {
  const sp = await searchParams;
  const category = sp?.category;

  const all = await getDishes();
  const dishes = category ? all.filter((d) => d.category === category) : all;

  return (
    <section>
      <h2>Our Menu</h2>
      {category && <p>Filtered by: {category}</p>}

      <div className="dish-grid">
        {dishes.map((dish) => (
          <article key={dish.id} className="dish-card">
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>
              <strong>{dish.price} ETB</strong>
            </p>
            <div className="dish-actions">
              <Link href={`/menu/${dish.id}`} className="btn btn-outline">
                View Dish
              </Link>
              <AddToCartButton dish={dish} />
            </div>
          </article>
        ))}
      </div>

      {dishes.length === 0 && <p>No dishes in this category.</p>}
    </section>
  );
}
