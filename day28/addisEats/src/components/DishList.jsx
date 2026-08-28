import PropTypes from "prop-types";
import Dish from "./Dish";

function DishList({ dishes, selectedCategory, onAdd }) {
  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  if (filteredDishes.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="dish-list">
      {filteredDishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    }),
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default DishList;
