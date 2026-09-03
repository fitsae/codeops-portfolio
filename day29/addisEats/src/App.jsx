import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import DeliveryForm from "./components/DeliveryForm";
import "./App.css";

function App() {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const searchRef = useRef(null);

  // Fetch dishes whenever category changes
  useEffect(() => {
    const controller = new AbortController();

    async function fetchDishes() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/Dishes.json", {
          signal: controller.signal,
        });

        // Check whether the HTTP request was successful
        if (!response.ok) {
          throw new Error(
            `Failed to load menu. Server responded with ${response.status}.`,
          );
        }

        const data = await response.json();

        // Filter by category
        const filteredDishes =
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category);

        setDishes(filteredDishes);
      } catch (err) {
        // Ignore errors caused by cancelling the request
        if (err.name !== "AbortError") {
          setError(
            err.message || "Something went wrong while loading the menu.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDishes();

    // Cancel the previous request when category changes
    return () => {
      controller.abort();
    };
  }, [category]);

  // Automatically focus the search input when the page loads
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  // Loading state
  if (loading) {
    return (
      <>
        <Header />

        <main className="container">
          <p>Loading Addis Eats menu...</p>
        </main>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Header />

        <main className="container">
          <p className="error-message">Error: {error}</p>
        </main>
      </>
    );
  }

  // Search filtering
  const searchedDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Header />

      <main className="container">
        <div className="menu-controls">
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
        </div>

        <Menu dishes={searchedDishes} />

        <DeliveryForm />
      </main>
    </>
  );
}

export default App;
