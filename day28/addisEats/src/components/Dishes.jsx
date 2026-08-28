import DishList from "./DishList";

function Dishes({ dishes, selectedCategory, onAdd }) {
  return (
    <DishList
      dishes={dishes}
      selectedCategory={selectedCategory}
      onAdd={onAdd}
    />
  );
}

export default Dishes;
