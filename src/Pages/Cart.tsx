// src/pages/Cart.tsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, remove, clear } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const fmt = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0E0E0E] to-[#1A1A1A] text-gray-100 px-4 py-12 pt-25">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-gray-400 text-center py-16">
            Your cart is empty.{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/catalog")}
            >
              Shop Products
            </span>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it) => (
                <div
                  key={it.product.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <img
                    src={it.product.images[0]}
                    alt={it.product.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-100">{it.product.title}</div>
                    <div className="text-sm text-gray-400 mt-1">Qty: {it.qty}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      Price per item: {fmt(it.product.price)}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="font-bold text-gray-100">{fmt(it.product.price * it.qty)}</div>
                    <button
                      onClick={() => remove(it.product.id)}
                      className="text-sm text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div className="text-lg font-semibold text-gray-100">
                Total: <span className="font-bold">{fmt(total)}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => clear()}
                  className="px-4 py-2 rounded-full border border-gray-700 text-gray-200 hover:bg-gray-800 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-4 py-2 rounded-full border border-amber-500 bg-amber-500 text-black hover:bg-amber-600 hover:border-amber-600 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
