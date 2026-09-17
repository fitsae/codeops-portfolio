// src/components/PageSkeleton.jsx
function PageSkeleton() {
  return (
    <div className="skeleton" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>
      <div className="skeleton__title" />
      <div className="skeleton__row" />
      <div className="skeleton__row" />
      <div className="skeleton__row skeleton__row--short" />
    </div>
  );
}

export default PageSkeleton;
