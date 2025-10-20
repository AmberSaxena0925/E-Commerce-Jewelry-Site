// src/pages/Orders.tsx
import React, { useEffect, useMemo, useState } from "react";
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
  const { items: cartItems, clear } = useCart();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");
  const [query, setQuery] = useState(""); // search query
  const [modalOrder, setModalOrder] = useState<OrderItem | null>(null);

  // currency formatter
  const fmt = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }),
    []
  );

  // load orders on mount
  useEffect(() => {
    const stored = localStorage.getItem("orders");
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch {
        setOrders([]);
      }
    }
  }, []);

  // persist when orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Add current cart as order if not empty
  const placeOrder = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const newOrder: OrderItem = {
      id: "ORD" + Date.now(),
      items: cartItems.map((i) => ({
        title: i.product.title,
        qty: i.qty,
        price: i.product.price,
      })),
      total: cartItems.reduce((sum, i) => sum + i.product.price * i.qty, 0),
      date: new Date().toLocaleString(),
      status: "Pending",
    };

    setOrders((prev) => [newOrder, ...prev]);
    clear();
    alert("Order placed successfully!");
  };

  // cancel (delete) an order
  const cancelOrder = (id: string) => {
    if (!confirm("Cancel this order? This action cannot be undone.")) return;
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // toggle status between Pending and Completed
  const toggleStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: o.status === "Pending" ? "Completed" : "Pending" } : o
      )
    );
  };

  // search + filter
  const visibleOrders = orders.filter((o) => {
    if (filter !== "All" && o.status !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    if (o.id.toLowerCase().includes(q)) return true;
    if (o.items.some((it) => it.title.toLowerCase().includes(q))) return true;
    return false;
  });

  return (
    <main className="min-h-screen bg-black text-gray-100 px-4 py-12 pt-25">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Your Orders</h1>
            <p className="text-sm text-gray-300 mt-1">
              Manage your orders — place new orders from cart, search, filter or view details.
            </p>
          </div>

          {/* action area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <input
              aria-label="Search orders"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order ID or product"
              className="px-3 py-2 rounded-md bg-gray-900 border border-gray-800 placeholder-gray-400 text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-64"
            />

            {/* Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("All")}
                className={`px-3 py-2 rounded-md text-sm ${
                  filter === "All" ? "bg-amber-500 text-black font-semibold" : "bg-gray-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("Pending")}
                className={`px-3 py-2 rounded-md text-sm ${
                  filter === "Pending" ? "bg-amber-500 text-black font-semibold" : "bg-gray-900"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter("Completed")}
                className={`px-3 py-2 rounded-md text-sm ${
                  filter === "Completed" ? "bg-amber-500 text-black font-semibold" : "bg-gray-900"
                }`}
              >
                Completed
              </button>
            </div>

            {/* Place order CTA */}
            {cartItems && cartItems.length > 0 ? (
              <button
                onClick={placeOrder}
                className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
              >
                Place Order ({cartItems.length})
              </button>
            ) : (
              <Link
                to="/catalog"
                className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
              >
                Shop Products
              </Link>
            )}
          </div>
        </div>

        {/* Orders list */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400">No orders yet.</p>
            <Link to="/catalog" className="mt-4 inline-block px-4 py-2 bg-amber-500 text-black rounded-full">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleOrders.map((order) => (
                <article
                  key={order.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-100">Order ID: {order.id}</h3>
                        <p className="text-xs text-gray-400 mt-1">Date: {order.date}</p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-3 space-y-2">
                      {order.items.slice(0, 3).map((it, i) => (
                        <li key={i} className="text-sm text-gray-200">
                          <span className="block sm:inline">{it.title}</span>{" "}
                          <span className="text-gray-400">×{it.qty}</span>{" "}
                          <span className="font-medium">{fmt.format(it.price * it.qty)}</span>
                        </li>
                      ))}

                      {/* show more indicator when many items */}
                      {order.items.length > 3 && (
                        <li className="text-xs text-gray-400">+{order.items.length - 3} more</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="font-bold text-gray-100">{fmt.format(order.total)}</div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setModalOrder(order)}
                        className="px-3 py-1 rounded-md bg-gray-800 text-sm text-gray-200 hover:bg-gray-700"
                        aria-label={`View details for ${order.id}`}
                      >
                        Details
                      </button>

                      {/* Toggle status */}
                      <button
                        onClick={() => toggleStatus(order.id)}
                        className="px-3 py-1 rounded-md bg-amber-500 text-black text-sm hover:bg-amber-400"
                        aria-label={`Toggle status for ${order.id}`}
                      >
                        {order.status === "Pending" ? "Mark Completed" : "Mark Pending"}
                      </button>

                      {/* Cancel only if pending */}
                      {order.status === "Pending" && (
                        <button
                          onClick={() => cancelOrder(order.id)}
                          className="px-2 py-1 rounded-md bg-red-700 text-sm text-white hover:bg-red-600"
                          aria-label={`Cancel order ${order.id}`}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* If search/filter yields no results */}
            {visibleOrders.length === 0 && (
              <div className="text-center mt-8 text-gray-400">
                No orders match your search / filter.
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal: order details */}
      {modalOrder && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setModalOrder(null)}
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-xl w-full bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Order {modalOrder.id}</h2>
                <p className="text-xs text-gray-400 mt-1">Placed: {modalOrder.date}</p>
              </div>
              <button
                onClick={() => setModalOrder(null)}
                className="text-gray-400 hover:text-gray-200"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <ul className="space-y-3">
                {modalOrder.items.map((it, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-100">{it.title}</div>
                      <div className="text-xs text-gray-400">Qty: {it.qty}</div>
                    </div>
                    <div className="font-medium">{fmt.format(it.price * it.qty)}</div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">Status: {modalOrder.status}</div>
                <div className="text-lg font-bold">{fmt.format(modalOrder.total)}</div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                {modalOrder.status === "Pending" && (
                  <button
                    onClick={() => {
                      toggleStatus(modalOrder.id);
                      setModalOrder((m) => (m ? { ...m, status: "Completed" } : m));
                    }}
                    className="px-4 py-2 rounded-md bg-amber-500 text-black"
                  >
                    Mark Completed
                  </button>
                )}
                <button
                  onClick={() => {
                    cancelOrder(modalOrder.id);
                    setModalOrder(null);
                  }}
                  className="px-4 py-2 rounded-md bg-red-700 text-white"
                >
                  Cancel Order
                </button>
                <button
                  onClick={() => setModalOrder(null)}
                  className="px-4 py-2 rounded-md bg-gray-800 text-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
