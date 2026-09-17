// src/App.jsx  (updated — checkout + receipt become lazy chunks)
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import DishDetails from "./pages/DishDetails";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import RequireAuth from "./routes/RequireAuth";

import "./App.css";

const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./pages/Receipt"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu/:id" element={<DishDetails />} />
        <Route path="signin" element={<SignIn />} />

        <Route element={<RequireAuth />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="receipt/:orderId" element={<Receipt />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
