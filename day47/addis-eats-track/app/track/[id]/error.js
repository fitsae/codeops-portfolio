"use client";

export default function Error({ error, reset }) {
  return (
    <main className="tracking-page">
      <div className="panel">
        <h2>Could not load this order</h2>
        <p style={{ color: "#b91c1c" }}>{error.message}</p>
        <button onClick={reset}>Retry</button>
      </div>
    </main>
  );
}
