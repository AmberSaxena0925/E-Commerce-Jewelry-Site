import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
  'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg',
  'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
];
export default function Hero(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return ( <section className="relative h-screen" aria-label="Hero">
      {/* Background images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.44), rgba(0, 0, 0, 0.29)), url(${img})`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40 pointer-events-none" />
<div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 flex items-center">
        <div className="w-full text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold leading-tight text-white">
            Everyday Luxary Garrented
          </h1>

          <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-gray-200">
            Your Search is For The Perfect Pearl Earing Ends Here. Meet Our Korean Pearl Tops!

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
          <div className="mt-6 text-[13px] text-gray-100 uppercase tracking-wide hidden sm:block">
            Featuring real, luminous pearls and a durable Korean gold or silver plating, these beauties add a touch of instant elegance to any outfit. Best of all? They come with a 6-month daily wear warranty, so you can shine on, worry-free!
            </div>

        </div>
      </div>
    </section>
  );
}
