import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      <h1>Addis Eats</h1>
      <p>Discover delicious meals and place your order.</p>

      <p style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <Link href="/menu" className="btn-primary">
          Browse the menu
        </Link>
        <Link href="/track/AE-1042" className="btn-secondary">
          Track order AE-1042
        </Link>
      </p>

      <h2 style={{ marginTop: 32 }}>Day 48 demos</h2>
      <ul>
        <li>
          <Link href="/events-demo">Event object</Link>
        </li>
        <li>
          <Link href="/events-demo/form">Form event</Link>
        </li>
        <li>
          <Link href="/events-demo/propagation">Propagation</Link>
        </li>
        <li>
          <Link href="/events-demo/counter">Counter</Link>
        </li>
        <li>
          <Link href="/events-demo/keyboard">Keyboard</Link>
        </li>
        <li>
          <Link href="/events-demo/browser">Browser width</Link>
        </li>
        <li>
          <Link href="/events-demo/config">Config</Link>
        </li>
      </ul>
    </main>
  );
}
