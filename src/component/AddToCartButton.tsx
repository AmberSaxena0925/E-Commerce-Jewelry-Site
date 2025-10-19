import React, { useState } from "react";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";

type Props = {
  product: Product;
  quantity?: number;
  darkMode?: boolean;
};

export default function AddToCartButton({ product, quantity = 1, darkMode = true }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleAdd = () => {
    add(product, quantity);
    setAdded(true);
    setIsClicked(true);

    // reset added state
    setTimeout(() => setAdded(false), 1500);
    // reset click animation
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <button
      onClick={handleAdd}
      className={`
        px-4 py-2 rounded-full font-semibold transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-yellow-300
        ${darkMode 
          ? `bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105 shadow-md hover:shadow-yellow-400/50
             ${isClicked ? "scale-110 shadow-lg shadow-yellow-400/70" : ""}`
          : "bg-yellow-400 text-black hover:bg-yellow-500"
        }
      `}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
