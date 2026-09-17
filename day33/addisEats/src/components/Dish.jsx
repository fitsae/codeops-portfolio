// src/components/Dish.jsx
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useCartStore, selectAddItem } from "../store/cartStore";

function Dish({ dish }) {
  const addItem = useCartStore(selectAddItem);

  return (
    <article className="dish-card">
      <h3>
        <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
      </h3>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>
      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
      <div className="dish-actions">
        <Link to={`/menu/${dish.id}`} className="details-link">
          View Details
        </Link>
        <button type="button" onClick={() => addItem(dish)}>
          Add to Cart
        </button>
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
};

export default Dish;
