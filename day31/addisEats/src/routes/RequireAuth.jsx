import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const location = useLocation();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
