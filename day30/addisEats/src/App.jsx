import { useEffect, useMemo, useRef, useState } from "react";

import Header from "./components/Header";
import Menu from "./components/Menu";
import CartPanel from "./components/CartPanel";
import DeliveryForm from "./components/DeliveryForm";

import useFetch from "./hooks/useFetch";

import "./App.css";

function App() {
  const [category, setCategory] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const searchRef = useRef(null);

  const { data: dishes, loading, error } = useFetch("/dishes.json");

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

  return (
    <>
      <Header />

      <main className="container">
        <section className="menu-controls">
          <input
            ref={searchRef}
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search dishes..."
            aria-label="Search dishes"
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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

        <CartPanel />

        <DeliveryForm />
      </main>
    </>
  );
}

export default App;
