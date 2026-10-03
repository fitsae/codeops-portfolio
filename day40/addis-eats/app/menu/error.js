"use client";

export default function Error({ error, reset }) {
  return (
    <section className="error-box">
      <h2>Something went wrong.</h2>
      <p>We could not load the menu.</p>
      <p className="error-detail">{error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </section>
  );
}
