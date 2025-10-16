import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

type OrderItem = {
  id: string;
  items: { title: string; qty: number; price: number }[];
  total: number;
  date: string;
  status: "Pending" | "Completed";
};

export default function Orders(): JSX.Element {
  const { items, clear } = useCart();
  const [orders, setOrders] = useState<OrderItem[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  // Add current cart as order if not empty
  const placeOrder = () => {
    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const newOrder: OrderItem = {
      id: "ORD" + Date.now(),
      items: items.map((i) => ({
        title: i.product.title,
        qty: i.qty,
        price: i.product.price,
      })),
      total: items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    clear();
    alert("Order placed successfully!");
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Orders</h1>

      {/* Place current cart as order */}
      {items.length > 0 && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Current Cart</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You have {items.length} item(s) in your cart ready to place.
          </p>
          <button
            onClick={placeOrder}
            className="mt-2 px-4 py-2 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors"
          >
            Place Order
          </button>
        </div>
      )}

      {/* Past and Present Orders */}
      {orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-center py-8">
          No orders yet. <Link to="/catalog" className="underline">Shop Products</Link>
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 bg-white dark:bg-gray-900">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Order ID: {order.id}</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Date: {order.date}</p>
              <ul className="mb-2">
                {order.items.map((it, idx) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300 text-sm">
                    {it.title} x {it.qty} — ₹{it.price * it.qty}
                  </li>
                ))}
              </ul>
              <div className="font-bold text-gray-900 dark:text-gray-100">Total: ₹{order.total}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
