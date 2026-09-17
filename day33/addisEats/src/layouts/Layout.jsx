import { NavLink, Outlet } from "react-router-dom";

import Header from "../components/Header";

function Layout() {
  return (
    <>
      <Header />

      <nav className="main-nav">
        <div className="container nav-content">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/menu">Menu</NavLink>

          <NavLink to="/checkout">Checkout</NavLink>
        </div>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
