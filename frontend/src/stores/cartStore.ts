import { create } from "zustand";

interface CartItem {
  id: string;
  image: string;
  heading: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      if (!item.id) {
        console.error("addToCart received invalid item:", item);
        return state; // Returnera oförändrat om data är felaktig
      }
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Uppdatera kvantiteten för den befintliga produkten
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          ),
        };
      }
      // Lägg till produkten som en ny post
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  decreaseQuantity: (id) =>
    set((state) => {
      if (!id) {
        console.error("decreaseQuantity called with undefined id");
        return state;
      }
      const existingItem = state.cart.find((cartItem) => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
          ),
        };
      } else if (existingItem) {
        return {
          cart: state.cart.filter((cartItem) => cartItem.id !== id),
        };
      }
      return state;
    }),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
