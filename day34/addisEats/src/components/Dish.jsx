// src/components/Dish.jsx  (final — memoized + forceError hook)
import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useCartStore, selectAddItem } from "../store/cartStore";

function Dish({ dish, onOpen, forceError = false }) {
  const addItem = useCartStore(selectAddItem);

  // Dev-only trigger. Visit /menu?break=6 to blow up Kitfo.
  if (forceError) {
    throw new Error(`Forced render error in “${dish.name}”`);
  }

  return (
    <article className="dish-card">
      <h3>
        <button
          type="button"
          className="dish-title-btn"
          onClick={() => onOpen(dish)}
        >
          {dish.name}
        </button>
      </h3>

      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>

      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}

      <div className="dish-actions">
        <button type="button" onClick={() => onOpen(dish)}>
          Quick view
        </button>
        <button type="button" onClick={() => addItem(dish)}>
          Add to Cart
        </button>
        <Link to={`/menu/${dish.id}`} className="details-link">
          Full page →
        </Link>
      </div>
    </article>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    spicy: PropTypes.bool.isRequired,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  forceError: PropTypes.bool,
};

export default memo(Dish);
