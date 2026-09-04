import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <h2>Welcome to Addis Eats</h2>

      <p>Discover delicious Ethiopian food delivered to your door.</p>

      <Link to="/menu" className="primary-link">
        Explore Our Menu
      </Link>
    </section>
  );
}

export default Home;
