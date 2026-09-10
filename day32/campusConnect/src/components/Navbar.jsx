import { Link, NavLink } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favoriteIds } = useFavorites();

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav>
      <Link to="/" className="logo">
        CampusConnect
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className={getNavLinkClass}>
          Home
        </NavLink>

        <NavLink to="/clubs" className={getNavLinkClass}>
          Clubs
        </NavLink>

        <NavLink to="/events" className={getNavLinkClass}>
          Events
        </NavLink>

        <NavLink to="/resources" className={getNavLinkClass}>
          Resources
        </NavLink>

        <NavLink to="/favorites" className={getNavLinkClass}>
          ♥ Favorites ({favoriteIds.length})
        </NavLink>

        <NavLink to="/about" className={getNavLinkClass}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
