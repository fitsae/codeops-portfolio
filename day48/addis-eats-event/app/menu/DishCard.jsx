import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { etb } from "@/lib/format";

export default function DishCard({ dish }) {
  return (
    <article
      className="panel"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h3 style={{ margin: 0 }}>
        <Link
          href={`/menu/${dish.id}`}
          style={{ color: "#23243a", textDecoration: "none" }}
        >
          {dish.name}
        </Link>
      </h3>

      <p style={{ margin: 0, color: "#64748b" }}>{dish.summary}</p>

      <p style={{ margin: 0 }}>
        <strong>{etb.format(dish.price)}</strong>
      </p>

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <AddToCartButton dish={dish} />
        <Link
          href={`/menu/${dish.id}`}
          className="btn-secondary"
          style={{ padding: "10px 16px" }}
        >
          Details
        </Link>
      </div>
    </article>
  );
}
