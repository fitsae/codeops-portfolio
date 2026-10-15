import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header style={{ background: "white", borderBottom: "1px solid #eef0f8" }}>
      <nav
        className="wrap"
        style={{
          display: "flex",
          gap: 16,
          padding: "12px 0",
          alignItems: "center",
        }}
      >
        <Link href="/" style={{ fontWeight: 600, textDecoration: "none" }}>
          Addis Eats
        </Link>
        <Link href="/menu">Menu</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/dashboard">Dashboard</Link>
        <span style={{ marginLeft: "auto" }}>
          <CartBadge />
        </span>
      </nav>
    </header>
  );
}
