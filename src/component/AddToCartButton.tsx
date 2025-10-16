import React from "react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

type Props = {
  product: Product;
  quantity?: number; // optional, default = 1
};

export default function AddToCartButton({ product, quantity = 1 }: Props) {
  const { add } = useCart();

  const handleAdd = () => {
    add(product, quantity);
  };

  return (
    <button
      onClick={handleAdd}
      className="px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
    >
      Add to Cart
    </button>
  );
}
