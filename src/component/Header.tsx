// src/components/Header.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Hotel, Menu, X, ShoppingCart, User, Home as HomeIcon, Box } from "lucide-react";

type HeaderProps = {
  count?: number; // optional cart count; pass from context or parent
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
        <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
          <Hotel className={`h-8 w-8 ${textClass}`} />
          <span className={`ml-2 text-xl font-bold ${textClass}`}>HOTEL</span>
        </Link>

        {/* Desktop Navigation */}
       <nav className="hidden sm:flex items-center gap-1 mt-3 sm:mt-0 font-medium text-gray-800">
          <Link to="/" className={`mx-3 flex items-center ${textClass} hover:text-blue-600 transition-colors`}>
            Home
          </Link>

          <Link to="/catalog" className={`mx-3 flex items-center ${textClass} hover:text-blue-600 transition-colors`}>
            Catalog
          </Link>

          <Link to="/orders" className={`mx-3 ${textClass} hover:text-blue-600 transition-colors`}>
            Orders
          </Link>

          <Link to="/contact" className={`mx-3 ${textClass} hover:text-blue-600 transition-colors`}>
            Contact
          </Link>

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

          <Link to="/account" className={`mx-3 flex items-center ${textClass} hover:text-blue-600 transition-colors`}>
            <User className={`h-4 w-4 mr-2 ${textClass}`} />
          </Link>

          <button
            onClick={handleSignIn}
            className={`mx-3 ${textClass} hover:text-blue-600 transition-colors`}
          >
            Login
          </button>

          <Link
            to="/signup"
            className="ml-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full transition-colors"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
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

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className={`h-6 w-6 ${textClass}`} /> : <Menu className={`h-6 w-6 ${textClass}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden absolute top-full left-0 right-0 shadow-lg transition-transform origin-top animate-fadeIn ${
            isScrolled || !isHomePage ? "bg-white" : "bg-white"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col">
            <Link
              to="/"
              className="py-3 border-b border-gray-100 text-slate-800 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            > Home
            </Link>

            <Link
              to="/catalog"
              className="py-3 border-b border-gray-100 text-slate-800 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            > Catalog
            </Link>

            <Link
              to="/orders"
              className="py-3 border-b border-gray-100 text-slate-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>

            <Link
              to="/contact"
              className="py-3 border-b border-gray-100 text-slate-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>


            <button
              onClick={handleSignIn}
              className="py-3 border-b border-gray-100 text-slate-800 text-left"
            >
              Login
            </button>

            <button
              onClick={handleSignup}
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-full text-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
