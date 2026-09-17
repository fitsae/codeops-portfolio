// src/components/Menu.jsx  (updated)
import { memo } from "react";
import Dish from "./Dish";
import ErrorBoundary from "./ErrorBoundary";
const BREAK_ID = import.meta.env.DEV
  ? Number(new URLSearchParams(window.location.search).get("break")) || -1
  : -1;

function Menu({ dishes, onOpen }) {
  return (
    <section className="menu">
      <h2>Our Menu</h2>
      {dishes.length === 0 ? (
        <p>No dishes found.</p>
      ) : (
        <div className="dish-list">
          {dishes.map((dish) => (
            // Per-dish boundary: one exploding card does NOT blank the grid.
            <ErrorBoundary
              key={dish.id}
              label={`Dish ${dish.id}`}
              fallback={({ error, reset }) => (
                <article className="dish-card dish-card--broken" role="alert">
                  <h3>Unavailable</h3>
                  <p>{error.message}</p>
                  <button type="button" onClick={reset}>
                    Retry
                  </button>
                </article>
              )}
            >
              <Dish
                dish={dish}
                onOpen={onOpen}
                forceError={dish.id === BREAK_ID}
              />
              <Dish dish={dish} onOpen={onOpen} />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
