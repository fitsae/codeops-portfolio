"use client";

import { useMemo, useState } from "react";
import DishList from "./DishList";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Drinks"];

export default function MenuClient({ dishes }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    let result = [...dishes];
    if (category !== "All") {
      result = result.filter((d) => d.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((d) => d.name.toLowerCase().includes(q));
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [dishes, category, search]);

  return (
    <>
      <section className="menu-controls">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search dishes…"
          aria-label="Search dishes"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter dishes by category"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </section>

      <h2>Our Menu</h2>
      <DishList dishes={visible} />
    </>
  );
}
