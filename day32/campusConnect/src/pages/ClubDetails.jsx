import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function ClubDetails() {
  const { id } = useParams();

  const { toggleFavorite, isFavorite } = useFavorites();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchClub = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/clubs.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load clubs.");
        }

        const clubs = await response.json();

        const selectedClub = clubs.find(
          (club) => String(club.id) === String(id),
        );

        if (!selectedClub) {
          throw new Error("Club not found.");
        }

        setClub(selectedClub);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClub();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <p>Loading club details...</p>;
  }

  if (error) {
    return (
      <section>
        <h1>Error</h1>
        <p>{error}</p>

        <Link to="/clubs">Back to Clubs</Link>
      </section>
    );
  }

  if (!club) {
    return <p>Club not found.</p>;
  }

  const favorite = isFavorite(club.id);

  return (
    <section className="details-page">
      <img src={club.image} alt={club.name} className="details-image" />

      <span className="category">{club.category}</span>

      <h1>{club.name}</h1>

      <p className="details-description">{club.description}</p>

      <div className="details-info">
        <h2>Meeting Information</h2>

        <p>
          <strong>Day:</strong> {club.meetingDay}
        </p>

        <p>
          <strong>Time:</strong> {club.meetingTime}
        </p>

        <p>
          <strong>Location:</strong> {club.location}
        </p>

        <p>
          <strong>Members:</strong> {club.members}
        </p>
      </div>

      <div className="interests">
        <h2>Areas of Interest</h2>

        {club.interests.map((interest) => (
          <span className="interest-tag" key={interest}>
            {interest}
          </span>
        ))}
      </div>

      <div className="details-actions">
        <Link to="/clubs">Back to Clubs</Link>

        <button
          type="button"
          className={favorite ? "favorite-button active" : "favorite-button"}
          onClick={() => toggleFavorite(club.id)}
          aria-pressed={favorite}
        >
          {favorite ? "♥ Remove Favorite" : "♡ Add to Favorites"}
        </button>
      </div>
    </section>
  );
}

export default ClubDetails;
