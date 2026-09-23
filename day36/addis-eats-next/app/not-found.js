import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <h2>404 — Page Not Found</h2>
      <p>Sorry, we couldn’t find what you were looking for.</p>
      <Link href="/" className="primary-link">
        Go Home
      </Link>
    </section>
  );
}
