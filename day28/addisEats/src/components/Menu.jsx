import { useState } from "react";
import CategoryBar from "./CategoryBar";
import Dishes from "./Dishes";

function Menu({ dishes }) {
  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Drinks"];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [total, setTotal] = useState(0);

  const handleAdd = (price) => {
    setTotal((previousTotal) => previousTotal + price);
  };

  return (
    <section className="menu">
      <h2>Our Menu</h2>

      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Dishes
        dishes={dishes}
        selectedCategory={selectedCategory}
        onAdd={handleAdd}
      />

      <div className="order-total">
        <h2>Order Total: {total.toFixed(2)} ETB</h2>
      </div>
    </section>
  );
}

export default Menu;
