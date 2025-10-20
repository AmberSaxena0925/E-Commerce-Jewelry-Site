import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const heroImages = [
  'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
  'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg',
  'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
];

// Card dimensions (matches w-[350px] mx-6)
const CARD_WIDTH = 350;
const CARD_MARGIN = 24;

export default function HomePage(): JSX.Element {
  const carouselProducts = products.filter(p => p.isBestSeller ?? true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(
    carouselProducts.length - 1
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  // HERO slider animation
  useEffect(() => {
    const heroInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroImages.length);
    }, 4700);
    return () => clearInterval(heroInterval);
  }, []);

  // PRODUCT carousel auto-slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCarouselIndex(prev =>
        prev === 0 ? carouselProducts.length - 1 : prev - 1
      );
    }, 3200);
    return () => clearInterval(slideInterval);
  }, [carouselProducts.length]);

  // Carousel sliding animation
  useEffect(() => {
    if (carouselRef.current && carouselProducts.length) {
      const shift = carouselIndex * (CARD_WIDTH + CARD_MARGIN * 2);
      carouselRef.current.style.transform = `translateX(-${shift}px)`;
      carouselRef.current.style.transition =
        'transform 1.2s cubic-bezier(0.77,0,0.18,1)';
    }
  }, [carouselIndex, carouselProducts.length]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden font-serif" aria-label="Hero">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-center bg-cover transition-opacity duration-1000 transform ${
              index === currentIndex ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 z-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${img})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 pointer-events-none" />
        <div className="relative z-20 max-w-5xl mx-auto px-6 lg:px-12 py-32 flex items-center justify-center md:justify-start h-full">
          <div className="w-full text-center md:text-left animate-fadeInUp">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-white tracking-tight mb-6 drop-shadow-2xl">
              Everyday Luxury <span className="text-yellow-400">Guaranteed</span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto md:mx-0 text-md sm:text-lg md:text-xl text-gray-200 drop-shadow-md mb-6">
              Discover our exclusive collection of luminous, Korean pearl tops crafted for elegance and everyday wear.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link to="/catalog"
                className="px-8 py-4 rounded-full border-2 border-yellow-400 bg-yellow-400 text-black font-semibold text-lg transition hover:bg-black hover:text-yellow-400 shadow-2xl"
                aria-label="Shop our collection">
                Shop Collection
              </Link>
              <Link to="/catalog?featured=true"
                className="px-8 py-4 rounded-full bg-white/10 text-white text-lg border-2 border-transparent hover:bg-white/20 transition shadow-xl"
                aria-label="View featured collection">
                Featured
              </Link>
            </div>
            <p className="mt-8 text-base md:text-lg text-gray-400 uppercase tracking-wider max-w-2xl leading-relaxed hidden md:block">
              Featuring real, luminous pearls with durable Korean gold or silver plating. 6-month daily wear warranty.
            </p>
          </div>
        </div>
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeInUp { animation: fadeInUp 1.2s ease forwards;}
        `}</style>
      </section>

      {/* SLIDING PRODUCT CAROUSEL */}
      <section className="bg-black py-16 select-none">
        <h2 className="text-4xl sm:text-5xl text-center font-serif mb-12 tracking-tight text-white drop-shadow-xl">
          Check Out Our <span className="text-yellow-400">Best Sellers</span>
        </h2>
        <div className="overflow-hidden w-full relative max-w-4xl mx-auto px-3" style={{ height: '430px' }}>
          <div
            ref={carouselRef}
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ width: `${(CARD_WIDTH + CARD_MARGIN * 2) * carouselProducts.length}px` }}
          >
            {carouselProducts.map((product, idx) => (
              <div
                key={product.id ?? idx}
                className="flex-shrink-0 w-[350px] mx-6 px-8 py-6 flex flex-col items-center justify-center bg-neutral-900 rounded-2xl shadow-xl relative"
              >
                <img
                  src={(product.images && product.images.length > 0) ? product.images[0] : '/images/placeholder.jpg'}
                  alt={product.title}
                  className="w-full h-56 object-cover rounded-xl mb-6 border-2 border-yellow-200"
                />
                <span className="absolute top-6 left-8 bg-black text-white text-xs px-3 py-1 rounded-full shadow">
                  Sale
                </span>
                <div className="mt-4 font-semibold text-lg text-center">{product.title}</div>
                <div className="text-xs text-yellow-300 mb-1">{product.vendor}</div>
                <div className="flex gap-2 items-center text-lg mt-1">
                  {product.compareAt && (
                    <span className="line-through text-gray-500">Rs. {product.compareAt}</span>
                  )}
                  <span className="font-bold text-yellow-400">Rs. {product.price}</span>
                </div>
                <Link to={`/product/${product.id}`}
                  className="mt-5 px-6 py-2 rounded-full bg-yellow-400 text-black font-bold tracking-wide shadow-md hover:bg-black hover:text-yellow-400 border-2 border-yellow-400 transition"
                >View Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
