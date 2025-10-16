import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { items } = useCart();
  const navigate = useNavigate();

  const count =
    items?.reduce((sum, item) => sum + (item.qty || 0), 0) || 0;

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700">
        {/* Left Info Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] sm:text-xs uppercase text-gray-600 text-center sm:text-left">
          <span>Every pearl comes with a guarantee certificate.</span>
          <span className="hidden sm:inline-block">Free delivery all over India.</span>
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center gap-4 mt-3 sm:mt-0 font-medium text-gray-800">
          <Link to="/" className="hover:text-gray-500 transition-colors">
            Home
          </Link>
          <Link to="/catalog" className="hover:text-gray-500 transition-colors">
            Catalog
          </Link>
          <Link to="/orders" className="hover:text-gray-500 transition-colors">
            Orders
          </Link>
          <Link to="/contact" className="hover:text-gray-500 transition-colors">
            Contact
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-gray-800 hover:text-gray-600 transition-colors"
            aria-label="Cart"
            title="View cart"
          >
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* Auth Buttons */}
          <Link
            to="/login"
            className="hidden sm:block px-4 py-1.5 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all rounded-md"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="hidden sm:block px-4 py-1.5 bg-gray-900 text-white hover:bg-gray-700 transition-all rounded-md"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
