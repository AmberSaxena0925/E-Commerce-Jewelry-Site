import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import AddToCartButton from "../component/AddToCartButton";

export default function ProductPage(): JSX.Element {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product)
    return (
      <div className="p-8 text-center text-gray-600 dark:text-gray-300">
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
    <main className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-gray-100">
          {product.title}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
          by {product.vendor}
        </p>

        <div className="mt-4 text-gray-900 dark:text-gray-100 text-xl md:text-2xl font-bold flex items-center gap-2">
          {product.compareAt && (
            <span className="line-through text-gray-500 dark:text-gray-400 text-lg">
              {fmt(product.compareAt)}
            </span>
          )}
          <span>{fmt(product.price)}</span>
        </div>

        <p className="mt-4 text-gray-700 dark:text-gray-300">{product.description}</p>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <AddToCartButton product={product} quantity={1} />
        </div>
      </div>
    </main>
  );
}
