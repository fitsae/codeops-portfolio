// src/pages/MenuPage.jsx  (updated)
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Menu from "../components/Menu";
import ErrorBoundary from "../components/ErrorBoundary";
import DishModal from "../components/DishModal";
import useFetch from "../hooks/useFetch";

function MenuPage() {
  const { data: dishes, loading, error } = useFetch("/dishes.json");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);

  const [openDish, setOpenDish] = useState(null);

  const category = searchParams.get("category") || "All";
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const visibleDishes = useMemo(() => {
    let result = [...dishes];
    if (category !== "All") {
      result = result.filter((d) => d.category === category);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [dishes, category, searchTerm]);

  // Stable callback so memoized <Dish /> never re-renders from this prop.
  const handleOpen = useCallback((dish) => setOpenDish(dish), []);
  const handleClose = useCallback(() => setOpenDish(null), []);

  function handleCategoryChange(event) {
    const params = new URLSearchParams(searchParams);
    const next = event.target.value;
    next === "All" ? params.delete("category") : params.set("category", next);
    setSearchParams(params);
  }

  function handleSearchChange(event) {
    const params = new URLSearchParams(searchParams);
    const value = event.target.value;
    value.trim() ? params.set("search", value) : params.delete("search");
    setSearchParams(params);
  }

  return (
    <>
      <section className="menu-controls">
        <input
          ref={searchRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search dishes..."
          aria-label="Search dishes"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          aria-label="Filter dishes by category"
        >
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Drinks">Drinks</option>
        </select>
      </section>

      {loading && <p>Loading Addis Eats menu...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && (
        <ErrorBoundary
          label="Menu"
          fallback={({ error: e, reset }) => (
            <div role="alert" className="error-boundary">
              <h3>The menu failed to render.</h3>
              <p>{e.message}</p>
              <button type="button" onClick={reset}>
                Reload menu
              </button>
            </div>
          )}
        >
          <Menu dishes={visibleDishes} onOpen={handleOpen} />
        </ErrorBoundary>
      )}

      {openDish && <DishModal dish={openDish} onClose={handleClose} />}
    </>
  );
}

export default MenuPage;
