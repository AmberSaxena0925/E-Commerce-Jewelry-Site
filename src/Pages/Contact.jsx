import React from "react";
import { products } from "../data/products";
import ProductCard from "../component/ProductCard";

export default function Contact() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12 pt-32 min-h-screen bg-gradient-to-br from-[#0E0E0E] to-[#1A1A1A]">
      <h1 className="text-4xl md:text-5xl font-bold mb-10 text-white text-center">
        Our Exclusive Collection
      </h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 py-16">
          <img
            src="/images/empty-box.png"
            alt="No products"
            className="w-32 h-32 mb-6"
          />
          <p className="text-lg font-medium text-gray-200">
            No products available right now.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Check back soon for our latest collection!
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {products.map((p, idx) => (
            <div
              key={p.id}
              className="break-inside-avoid bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{
                animation: `fadeUp 0.5s ease ${(idx + 1) * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <ProductCard p={p} dark />
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </main>
  );
}
