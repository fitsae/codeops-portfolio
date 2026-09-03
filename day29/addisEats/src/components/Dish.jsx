import PropTypes from "prop-types";

function Dish({ dish }) {
  return (
    <article className="dish-card">
      <h3>{dish.name}</h3>

      <p>Category: {dish.category}</p>

      <p>Price: {dish.price} ETB</p>

      {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
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
