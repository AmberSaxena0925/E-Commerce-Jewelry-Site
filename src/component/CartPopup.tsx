import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartPopup({ open, onClose }: Props) {
  const { items, remove, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative bg-white dark:bg-gray-900 w-80 h-full shadow-xl flex flex-col p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Your Cart
        </h2>

        <div className="flex-1 mt-4 overflow-y-auto space-y-4">
          {items.length === 0 && (
            <p className="text-gray-600 dark:text-gray-300">Cart is empty</p>
          )}

          {items.map((it) => (
            <div
              key={it.product.id}
              className="flex items-center gap-3 border-b pb-2"
            >
              <img
                src={it.product.images[0]}
                alt={it.product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-semibold text-sm">{it.product.title}</div>
                <div className="text-xs">Qty: {it.qty}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">₹{it.product.price * it.qty}</div>
                <button
                  onClick={() => remove(it.product.id)}
                  className="mt-1 text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={clear}
                className="flex-1 px-4 py-2 rounded-full border text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Clear
              </button>
              <Link
                to="/cart"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-full bg-amber-500 text-black font-semibold text-sm text-center hover:bg-amber-400"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
