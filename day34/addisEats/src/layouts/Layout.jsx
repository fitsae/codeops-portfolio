// src/layouts/Layout.jsx  (updated — Suspense inside Layout keeps header/nav mounted)
import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

import Header from "../components/Header";
import PageSkeleton from "../components/PageSkeleton";

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
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

export default Layout;
