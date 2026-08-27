import PropTypes from "prop-types";
import { useState } from "react";

const dishes = [
  {
    id: 1,
    name: "Doro Wot",
    price: 350,
    category: "Wot",
    spicy: true,
  },
  {
    id: 2,
    name: "Kitfo",
    price: 400,
    category: "Meat",
    spicy: false,
  },
  {
    id: 3,
    name: "Tibs",
    price: 300,
    category: "Meat",
    spicy: true,
  },
  {
    id: 4,
    name: "Shiro Wot",
    price: 200,
    category: "Wot",
    spicy: false,
  },
  {
    id: 5,
    name: "Beyaynetu",
    price: 250,
    category: "Vegetarian",
    spicy: false,
  },
];

function Card({ children }) {
  return <article className="card">{children}</article>;
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

function Dish({ name, price, spicy, currency }) {
  return (
    <Card>
      <h3>{name}</h3>

      <p>
        {price} {currency}
      </p>

      {typeof spicy === "boolean" && spicy && <span>🌶️ Spicy</span>}
    </Card>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

Dish.defaultProps = {
  currency: "ETB",
};

function Dishes() {
  const [category, setCategory] = useState("All");

  const categories = ["All", "Wot", "Meat", "Vegetarian"];

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section>
      <h2>Our Menu</h2>

      <div>
        {categories.map((item) => (
          <button key={item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      {filteredDishes.length === 0 ? (
        <p>No dishes found in this category.</p>
      ) : (
        filteredDishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        ))
      )}
    </section>
  );
}

export default Dishes;
