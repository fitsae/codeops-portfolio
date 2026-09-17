import { Link, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

function DishDetails() {
  const { id } = useParams();

  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  const dish = dishes.find((item) => String(item.id) === id);

  if (!dish) {
    return (
      <section>
        <h2>Dish Not Found</h2>

        <p>The dish you are looking for does not exist.</p>

        <Link to="/menu">Back to Menu</Link>
      </section>
    );
  }

  return (
    <section className="dish-details">
      <h2>{dish.name}</h2>

      <p>Category: {dish.category}</p>

      <p>Price: {dish.price} ETB</p>

      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}

      <br />

      <Link to="/menu">← Back to Menu</Link>
    </section>
  );
}

export default DishDetails;
