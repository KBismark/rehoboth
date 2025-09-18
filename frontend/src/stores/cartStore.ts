import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, CartStore } from "@/types";

function getBasePrice(product: Product): number {
  if (typeof product.price === "number") {
    return product.price;
  }
  if (product.prices && typeof product.prices === "object") {
    const values = Object.values(product.prices) as number[];
    return Math.min(...values);
  }
  return 0;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (
        product: Product,
        quantity: number = 1,
        selectedSize: "small" | "medium" | "large" | "extraLarge" = "medium"
      ) => {
        const items = get().items;

        // Determine the price for the selected size
        const selectedPrice =
          product.prices?.[selectedSize] ?? product.price ?? 0;
        const existingItem = items.find(
          (item) =>
            item.product.id === product.id && item.selectedSize === selectedSize
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id &&
              item.selectedSize === selectedSize
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          const newItem: CartItem = {
            id: `${product.id}-${selectedSize}-${Date.now()}`,
            product,
            quantity,
            selectedPrice,
            selectedSize,
            addedAt: new Date(),
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.selectedPrice ?? getBasePrice(item.product);
          return total + price * item.quantity;
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
