export default function MenuLoading() {
  return (
    <section className="menu-skeleton" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading menu…</span>
      <div className="skeleton skeleton__title" />
      <div className="dish-list">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="dish-card" key={i}>
            <div className="skeleton skeleton__row" />
            <div className="skeleton skeleton__row skeleton__row--short" />
            <div className="skeleton skeleton__row skeleton__row--short" />
          </div>
        ))}
      </div>
    </section>
  );
}
