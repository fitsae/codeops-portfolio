import Link from "next/link";

export default function HomePage() {
  return (
    <section className="home-page">
      <h2>Welcome to Addis Eats</h2>
      <p>Discover delicious Ethiopian food delivered to your door.</p>
      <Link href="/menu" className="primary-link">
        Explore Our Menu
      </Link>
    </section>
  );
}
