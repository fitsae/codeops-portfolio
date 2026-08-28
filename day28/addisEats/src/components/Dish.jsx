import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, spicy, currency = "ETB", onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount((previousCount) => previousCount + 1);
    onAdd(price);
  };

  return (
    <article className="dish">
      <div className="dish-info">
        <h3>{name}</h3>

        <p className="price">
          {price.toFixed(2)} {currency}
        </p>

        {spicy && <span className="spicy">Spicy</span>}

        {count > 0 && <p className="quantity">Quantity: {count}</p>}
      </div>

      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </article>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  spicy: false,
  currency: "ETB",
};

export default Dish;
