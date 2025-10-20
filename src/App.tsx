import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { CartProvider } from "./context/CartContext";

export default function App(): JSX.Element {
  const location = useLocation(); // ✅ must be inside BrowserRouter

  const noFooterRoutes = ["/login", "/signup"];
  const hideFooter = noFooterRoutes.includes(location.pathname);

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {!hideFooter && <Footer />}
      </div>
    </CartProvider>
  );
}
