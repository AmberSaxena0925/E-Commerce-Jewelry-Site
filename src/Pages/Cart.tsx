import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, remove, clear } = useCart();
  const navigate = useNavigate();

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  // Format price as INR
  const fmt = (value: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout"); // Redirect to checkout page
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 pt-32">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">Your Cart</h1>

      <div className="mt-6 space-y-4">
        {items.length === 0 && (
          <div className="text-gray-600 dark:text-gray-300 text-center py-8">
            Your cart is empty
          </div>
        )}

        {items.map((it) => (
          <div
            key={it.product.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <img
              src={it.product.images[0]}
              alt={it.product.title}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="font-semibold text-gray-900 dark:text-gray-100">{it.product.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Qty: {it.qty}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Price per item: {fmt(it.product.price)}</div>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-2 mt-2 sm:mt-0">
              <div className="font-bold text-gray-900 dark:text-gray-100">{fmt(it.product.price * it.qty)}</div>
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

      {items.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="text-lg text-gray-900 dark:text-gray-100">
            Total: <span className="font-bold">{fmt(total)}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => clear()}
              className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 rounded-full border border-yellow-400 bg-yellow-400 text-black hover:bg-yellow-500 hover:border-yellow-500 transition-colors"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
