// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Hotel, Menu, X, ShoppingCart, User } from "lucide-react";

type HeaderProps = {
  count?: number;
};

const Header: React.FC<HeaderProps> = ({ count = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || !isHomePage ? "bg-white shadow-md py-3" : "bg-transparent py-5"
  }`;

  const textClass = isScrolled || !isHomePage ? "text-slate-800" : "text-white";

  const handleSignIn = () => {
    navigate("/signin");
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    navigate("/signup");
    setIsMenuOpen(false);
  };

  const goCart = () => {
    navigate("/cart");
    setIsMenuOpen(false);
  };

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <Hotel className={`h-8 w-8 ${textClass}`} />
          <span className={`ml-2 text-xl font-bold ${textClass}`}>NP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-1 mt-3 sm:mt-0 font-medium text-gray-800">
          <Link to="/" className={`mx-3 ${textClass} hover:text-blue-600 transition-colors`}>
            Home
          </Link>
          <Link to="/catalog" className={`mx-3 ${textClass} hover:text-blue-600 transition-colors`}>
            Catalog
          </Link>
          <Link to="/orders" className={`mx-3 ${textClass} hover:text-blue-600 transition-colors`}>
            Orders
          </Link>
          <Link to="/Contact" className={`mx-3 ${textClass} hover:text-blue-600 transition-colors`}>
            Contact
          </Link>

          {/* Cart */}
          <button
            onClick={goCart}
            className={`relative mx-3 ${textClass} hover:text-blue-600 transition-colors`}
            aria-label="Cart"
            title="View cart"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-gray-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          {/* User + Login */}
          <Link to="/account" className={`mx-3 flex items-center ${textClass} hover:text-blue-600`}>
            <User className={`h-4 w-4 mr-2 ${textClass}`} />
          </Link>
          
          <Link
            to="/login"
            className="mx-3 ${textClass} hover:text-blue-600 transition-colors"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="ml-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full transition-colors"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Cart stays visible */}
          <button
            onClick={goCart}
            className={`relative mr-3 ${textClass} hover:text-gray-300 transition-colors`}
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

          {/* Menu toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${textClass}`} />
            ) : (
              <Menu className={`h-6 w-6 ${textClass}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMenuOpen}
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-40 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-4 border-b border-gray-800">
          <div className="flex items-center">
            <div className="text-lg font-serif tracking-wide text-white">NP</div>
            <div className="ml-3 text-sm text-gray-400 leading-none">Sai Naman Pearls</div>
          </div>

          <button
            className="ml-auto p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(false)} // <-- fixed: use setIsMenuOpen
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/catalog" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400">
            Catalog
          </Link>
          <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400">
            Orders
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-400">
            Contact
          </Link>
          <button onClick={handleSignIn} className="hover:text-blue-400 text-left">
            Login
          </button>
          <button
            onClick={handleSignup}
            className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-full text-center hover:bg-blue-800"
          >
            Sign Up
          </button>
        </nav>
      </div>

      {/* Dark overlay behind the sliding menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;
