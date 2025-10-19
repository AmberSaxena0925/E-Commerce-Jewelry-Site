// src/pages/ProductDetail.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Minus, Plus, Share2 } from "lucide-react";
import { products } from "../data/products"; // import your product array here
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const cart = useCart() as any;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>Product not found</p>
      </div>
    );
  }

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center px-6 py-12">
      {/* Product Image */}
      <div className="flex-1 flex justify-center mb-10 md:mb-0">
        <div className="max-w-md">
          <img
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.title}
            className="w-full object-contain rounded-lg"
            />
          <div className="mt-4 text-center text-2xl font-serif italic text-gray-200">
            {product.vendor}
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 max-w-lg space-y-5">
        <p className="text-sm uppercase tracking-widest text-gray-400">
          {product.vendor}
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
          {product.title}
        </h1>

        <div className="flex items-center gap-3 text-lg">
          {product.compareAt && (
            <span className="line-through text-gray-500">
              Rs. {product.compareAt}
            </span>
          )}
          <span className="font-semibold text-white">Rs. {product.price}</span>
          {product.compareAt && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-black rounded">
              Sale
            </span>
          )}
        </div>

        <p className="text-sm text-gray-400">
          Taxes included.{" "}
          <a href="#" className="underline hover:text-gray-200">
            Shipping
          </a>{" "}
          calculated at checkout.
        </p>

        {/* Quantity Selector */}
        <div>
          <label className="block mb-1 text-sm text-gray-300">Quantity</label>
          <div className="flex items-center border border-gray-600 w-fit rounded-md overflow-hidden">
            <button onClick={decreaseQty} className="px-3 py-2 hover:bg-gray-800">
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 text-white">{quantity}</span>
            <button onClick={increaseQty} className="px-3 py-2 hover:bg-gray-800">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => cart.addToCart(product, quantity)}
            className="w-full py-3 border border-white rounded-full hover:bg-white hover:text-black transition"
            >
            Add to cart
          </button>
          <button className="w-full py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
            Buy it now
          </button>
        </div>

        {/* Share / Details */}
        <div className="flex items-center justify-between text-sm pt-4 text-gray-400">
          <button className="flex items-center gap-2 hover:text-white">
            <Share2 size={16} /> Share
          </button>
          <button className="flex items-center gap-1 hover:text-white">
            View full details <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
