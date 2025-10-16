import React from "react";
import { products } from "../data/products";
import ProductCard from "../component/ProductCard";

export default function Catalog(): JSX.Element {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
        Catalog
      </h1>

      {products.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 py-12">
          No products available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </main>
  );
}
