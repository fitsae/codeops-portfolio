import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ClubCard from "../components/ClubCard";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { favoriteIds } = useFavorites();

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/clubs.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load clubs.");
        }

        const data = await response.json();

        setClubs(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();

    return () => {
      controller.abort();
    };
  }, []);

  const favoriteClubs = clubs.filter((club) => favoriteIds.includes(club.id));

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (error) {
    return (
      <section>
        <h1>Error</h1>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Favorite Clubs</h1>

      <p>Clubs you have saved to your favorites.</p>

      {favoriteClubs.length === 0 ? (
        <div className="empty-state">
          <h2>No Favorite Clubs Yet</h2>

          <p>Explore campus clubs and add your favorite clubs here.</p>

          <Link to="/clubs">Explore Clubs</Link>
        </div>
      ) : (
        <div className="card-grid">
          {favoriteClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Favorites;
