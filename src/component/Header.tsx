import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { items } = useCart();
  const count = items?.reduce((sum, item) => sum + (item.qty || 0), 0) || 0;

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[11px] sm:text-xs uppercase text-gray-600 text-center sm:text-left">
          <span>Every pearl comes with a guarantee certificate.</span>
          <span className="hidden sm:inline-block">Free delivery all over India.</span>
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center gap-4 mt-2 sm:mt-0 text-gray-800 font-medium">
          <Link to="/" className="hover:text-gray-500 transition-colors">Home</Link>
          <Link to="/catalog" className="hover:text-gray-500 transition-colors">Catalog</Link>
          <Link to="/orders" className="hover:text-gray-500 transition-colors">Orders</Link>
          <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
          <Link
            to="/cart"
            className="ml-2 px-3 py-1 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cart ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
