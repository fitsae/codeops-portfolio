import Dish from "./Dish";

function Menu({ dishes }) {
  return (
    <section className="menu">
      <h2>Our Menu</h2>

      {dishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div className="dish-list">
          {dishes.map((dish) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
