import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout(): JSX.Element {
  const { items, clear } = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !address) return alert("Please fill all fields");
    setSuccess(true);
    clear(); // clear cart after checkout
    setTimeout(() => navigate("/"), 3000); // redirect after 3s
  };

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        <Link
          to="/catalog"
          className="mt-4 inline-block px-6 py-2 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400"
        >
          Shop Products
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Thank you for your purchase!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">You will be redirected to the homepage shortly.</p>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Checkout</h1>

      {/* Cart summary */}
      <div className="mb-8">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Your Items</h2>
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.product.id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{it.product.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Qty: {it.qty}</p>
              </div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">₹{it.product.price * it.qty}</p>
            </div>
          ))}
          <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 mt-4">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>

      {/* Checkout form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Shipping Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 dark:bg-gray-800 dark:text-white"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors"
        >
          Complete Purchase
        </button>
      </form>
    </main>
  );
}
