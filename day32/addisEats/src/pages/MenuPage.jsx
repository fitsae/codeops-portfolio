import { useEffect, useMemo, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import Menu from "../components/Menu";

import useFetch from "../hooks/useFetch";

function MenuPage() {
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  const [searchParams, setSearchParams] = useSearchParams();

  const searchRef = useRef(null);

  const category = searchParams.get("category") || "All";

  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const visibleDishes = useMemo(() => {
    let result = [...dishes];

    if (category !== "All") {
      result = result.filter((dish) => dish.category === category);
    }

    if (searchTerm.trim()) {
      result = result.filter((dish) =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [dishes, category, searchTerm]);

  function handleCategoryChange(event) {
    const newCategory = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (newCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", newCategory);
    }

    setSearchParams(params);
  }

  function handleSearchChange(event) {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    if (!value.trim()) {
      params.delete("search");
    } else {
      params.set("search", value);
    }

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

      {!loading && !error && <Menu dishes={visibleDishes} />}
    </>
  );
}

export default MenuPage;
