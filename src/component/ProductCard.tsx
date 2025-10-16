import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import AddToCartButton from "./AddToCartButton";

type Props = {
  p: Product;
};

export default function ProductCard({ p }: Props): JSX.Element {
  // safe image fallback
  const imgSrc = p.images && p.images.length > 0 ? p.images[0] : "/images/placeholder.png";

  // price formatting
  const fmt = (value?: number | string) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
      Number(value ?? 0)
    );

  return (
    <article className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden group">
      {/* Image (link) */}
      <Link
        to={`/product/${p.id}`}
        className="block w-full h-[220px] sm:h-56 lg:h-48 overflow-hidden"
        aria-label={`View ${p.title}`}
      >
        <img
          src={imgSrc}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (!target.dataset.errored) {
              target.src = "/images/placeholder.png";
              target.dataset.errored = "true";
            }
          }}
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold line-clamp-2 text-gray-900 dark:text-gray-100">
          {p.title}
        </h3>

        <div className="mt-2 flex items-baseline gap-3">
          {p.compareAt && <span className="text-xs text-gray-500 line-through">{fmt(p.compareAt)}</span>}
          <span className="text-lg font-bold text-gray-900 dark:text-white">{fmt(p.price)}</span>
        </div>

        <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
          {p.subtitle ?? p.description ?? ""}
        </p>

        {/* Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
          <AddToCartButton product={p} />
          <Link
            to={`/product/${p.id}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label={`View ${p.title} details`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
