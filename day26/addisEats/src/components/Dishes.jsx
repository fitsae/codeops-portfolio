const dishes = [
  { id: 1, name: "Doro Wot", price: 350 },
  { id: 2, name: "Kitfo", price: 400 },
  { id: 3, name: "Tibs", price: 300 },
  { id: 4, name: "Shiro Wot", price: 200 },
  { id: 5, name: "Beyaynetu", price: 250 },
];

function Dish({ name, price }) {
  return (
    <article>
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </article>
  );
}

function Dishes() {
  return (
    <section>
      <h2>Our Menu</h2>

      {dishes.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </section>
  );
}

export default Dishes;
