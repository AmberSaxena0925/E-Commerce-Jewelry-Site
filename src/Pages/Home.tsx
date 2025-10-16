import React from "react";
import Hero from "../component/Hero";
import { products } from "../data/products";
import ProductCard from "../component/ProductCard";

export default function Home(): JSX.Element {
  const featuredProducts = products.slice(0, 4);

  return (
    <main>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
          Featured Products
        </h2>

        {featuredProducts.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300 py-12">
            No featured products available.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
