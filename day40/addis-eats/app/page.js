import Link from "next/link";

export default function HomePage() {
  return (
    <section className="home">
      <h2>Welcome to Addis Eats</h2>
      <p>Discover delicious Ethiopian food and order your favorite dishes.</p>
      <Link href="/menu" className="btn">
        View Menu
      </Link>
    </section>
  );
}
