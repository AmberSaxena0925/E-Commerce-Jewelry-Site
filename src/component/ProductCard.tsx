import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import AddToCartButton from "./AddToCartButton";

type Props = {
  p: Product;
};

export default function ProductCard({ p }: Props): JSX.Element {
  const imgSrc = p.images && p.images.length > 0 ? p.images[0] : "/images/placeholder.png";

  const fmt = (value?: number | string) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
      Number(value ?? 0)
    );

  return (
    <article className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-800 group hover:border-yellow-400">
      
      {/* Image */}
      <Link
        to={`/product/${p.id}`}
        className="block w-full h-[220px] sm:h-56 lg:h-48 relative overflow-hidden"
        aria-label={`View ${p.title}`}
      >
        <img
          src={imgSrc}
          alt={p.title}
          loading="lazy"
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            if (!target.dataset.errored) {
              target.src = "/images/placeholder.png";
              target.dataset.errored = "true";
            }
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-yellow-400 font-semibold text-lg tracking-wide">View Details</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col relative z-10">
        <h3 className="text-sm font-semibold line-clamp-2 text-white">{p.title}</h3>

        <div className="mt-2 flex items-baseline gap-3">
          {p.compareAt && <span className="text-xs text-gray-500 line-through">{fmt(p.compareAt)}</span>}
          <span className="text-lg font-bold text-yellow-400 transition-transform duration-300 group-hover:translate-y-[-2px]">{fmt(p.price)}</span>
        </div>

        <p className="mt-2 text-xs text-gray-300 line-clamp-2">{p.description ?? ""}</p>

        {/* Buttons */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
          <AddToCartButton {...({ product: p, darkMode: true } as any)} />
          <Link
            to={`/product/${p.id}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-700 text-sm text-gray-200 hover:bg-yellow-400 hover:text-black transition-all duration-300"
            aria-label={`View ${p.title} details`}
          >
            View
          </Link>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 pointer-events-none rounded-xl shadow-yellow-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"></div>
    </article>
  );
}
