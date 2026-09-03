import { useContext } from "react";
import PropTypes from "prop-types";

import { CartContext } from "../context/cartContext";

function Dish({ dish }) {
  const { dispatch } = useContext(CartContext);

  function handleAdd() {
    dispatch({
      type: "ADD",
      payload: dish,
    });
  }

  return (
    <article className="dish-card">
      <h3>{dish.name}</h3>

      <p>Category: {dish.category}</p>

      <p>Price: {dish.price} ETB</p>

      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}

      <button type="button" onClick={handleAdd}>
        Add to Cart
      </button>
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
