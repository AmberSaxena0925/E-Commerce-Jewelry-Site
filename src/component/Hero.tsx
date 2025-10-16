import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero(): JSX.Element {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-[60vh] md:min-h-[72vh] lg:min-h-[80vh] bg-gray-900"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.74), rgba(0, 0, 0, 0.97)), url('/images/hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for extra contrast on small/old browsers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 flex items-center">
        <div className="w-full text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold leading-tight text-white">
            STAY STYLISH WITH OUR NEWEST COLLECTION.
          </h1>

          <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-gray-200">
            Exquisite pearls crafted for moments that matter — ethically sourced and
            hand-finished to perfection.
          </p>

          <div className="mt-6 flex items-center justify-center md:justify-start gap-4 flex-col sm:flex-row">
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-yellow-400 bg-transparent text-yellow-300 font-semibold text-sm sm:text-base transition-all duration-200 hover:bg-yellow-400 hover:text-black focus:outline-none focus:ring-4 focus:ring-yellow-400/40"
              aria-label="Shop our collection"
            >
              Shop Collection
            </Link>

            <Link
              to="/catalog?featured=true"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 text-white text-sm sm:text-base border border-transparent hover:bg-white/20 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-white/20"
              aria-label="View featured collection"
            >
              Featured
            </Link>
          </div>

          {/* Small decorative text for mobile */}
          <div className="mt-6 text-xs text-gray-300 uppercase tracking-wide hidden sm:block">
            Free delivery across India • Guarantee certificate with every pearl
          </div>
        </div>
      </div>
    </section>
  );
}