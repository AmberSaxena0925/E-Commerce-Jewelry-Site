import React from "react";
import { Product } from "../data/products";

type CartItem = { product: Product; qty: number };

type CartState = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  updateQty: (id: string, qty: number) => void;
  totalItems: number;
  totalPrice: number;
};

const STORAGE_KEY = "shop_cart_v1";

const CartContext = React.createContext<CartState | undefined>(undefined);

const calcTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + Number(i.product.price ?? 0) * i.qty, 0);
  return { totalItems, totalPrice };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      // basic validation: ensure structure
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((it) => it?.product?.id);
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever items change
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / privacy errors
    }
  }, [items]);

  const add = React.useCallback((product: Product, qty = 1) => {
    if (!product?.id) return;
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const remove = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = React.useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) {
        // remove if zero or negative
        return prev.filter((i) => i.product.id !== id);
      }
      return prev.map((i) => (i.product.id === id ? { ...i, qty } : i));
    });
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const { totalItems, totalPrice } = React.useMemo(() => calcTotals(items), [items]);

  const value = React.useMemo(
    () => ({ items, add, remove, clear, updateQty, totalItems, totalPrice }),
    [items, add, remove, clear, updateQty, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
