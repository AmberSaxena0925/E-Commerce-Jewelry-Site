import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import AddToCartButton from "../component/AddToCartButton";

export default function ProductPage(): JSX.Element {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product)
    return (
      <div className="p-8 text-center text-gray-400 bg-black min-h-screen flex items-center justify-center pt-20">
        Product not found
      </div>
    );

  const fmt = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 pt-32 bg-black text-white min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-400">
        <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link> &rarr;{" "}
        <Link to="/catalog" className="hover:text-yellow-400 transition-colors">Catalog</Link> &rarr;{" "}
        <span>{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
            {product.title}
          </h1>
          <p className="mt-1 text-sm text-gray-400">by {product.vendor}</p>

          <div className="mt-4 flex items-baseline gap-3">
            {product.compareAt && (
              <span className="line-through text-gray-500 text-lg">
                {fmt(product.compareAt)}
              </span>
            )}
            <span className="text-2xl md:text-3xl font-bold text-yellow-400">
              {fmt(product.price)}
            </span>
          </div>

          <p className="mt-6 text-gray-300 text-sm md:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <AddToCartButton product={product} quantity={1} darkMode />
          </div>
        </div>
      </div>
    </main>
  );
}
