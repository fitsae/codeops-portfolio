import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import DishDetails from "./pages/DishDetails";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

import RequireAuth from "./routes/RequireAuth";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Landing page */}
        <Route index element={<Home />} />

        {/* Menu */}
        <Route path="menu" element={<MenuPage />} />

        {/* Individual dish */}
        <Route path="menu/:id" element={<DishDetails />} />

        {/* Sign in */}
        <Route path="signin" element={<SignIn />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
