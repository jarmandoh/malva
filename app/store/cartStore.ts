import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
          if (existingItem) {
            // Si el producto ya existe, incrementa la cantidad
            const updatedItems = state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { items: updatedItems, totalItems: state.totalItems + 1 };
          } else {
            // Si es un producto nuevo, añádelo
            return { items: [...state.items, { ...product, quantity: 1 }], totalItems: state.totalItems + 1 };
          }
        });
      },
      removeFromCart: (productId) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === productId);
          if (existingItem && existingItem.quantity > 1) {
            // Si hay más de uno, decrementa la cantidad
            const updatedItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
            return { items: updatedItems, totalItems: state.totalItems - 1 };
          } else {
            // Si es el último, quítalo del carrito
            return { items: state.items.filter((item) => item.id !== productId), totalItems: state.totalItems - 1 };
          }
        });
      },
      clearCart: () => set({ items: [], totalItems: 0 }),
    }),
    {
      name: 'malva-cart-storage', // Nombre para el localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);