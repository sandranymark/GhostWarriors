
import { create } from 'zustand';

interface CartItem {
  id: string;
  image: string;
  heading: string;
  price: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Om produkten redan finns, uppdatera kvantiteten
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 } // Uppdatera kvantiteten för den befintliga produkten
              : cartItem
          ),
        };
      }
      // Om produkten inte finns i varukorgen, lägg till den som en ny produkt
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  decreaseQuantity: (id) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === id
              ? { ...cartItem, quantity: cartItem.quantity - 1 } // Minska kvantiteten om den är större än 1
              : cartItem
          ),
        };
      } else if (existingItem && existingItem.quantity === 1) {
        return {
          cart: state.cart.filter((cartItem) => cartItem.id !== id), // Ta bort produkten om kvantiteten är 1
        };
      }
      return state;
    }),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
