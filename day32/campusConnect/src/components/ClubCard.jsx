import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function ClubCard({ club }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(club.id);

  return (
    <article className="club-card">
      <img src={club.image} alt={club.name} />

      <div className="card-content">
        <span className="category">{club.category}</span>

        <h2>{club.name}</h2>

        <p>{club.description}</p>

        <p>
          <strong>Members:</strong> {club.members}
        </p>

        <div className="card-actions">
          <Link to={`/clubs/${club.id}`}>View Club</Link>

          <button
            type="button"
            className={favorite ? "favorite-button active" : "favorite-button"}
            onClick={() => toggleFavorite(club.id)}
            aria-pressed={favorite}
          >
            {favorite ? "♥ Favorited" : "♡ Favorite"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ClubCard;
