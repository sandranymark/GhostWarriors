import { create } from "zustand";
import { CartItem, CartState } from "../types/cartType";

const useCartStore = create<CartState>((set) => ({
  cart: [],
  updateCart: (id, action, itemData) =>
    set((state) => {
      if (!id) {
        console.error("updateCart called with undefined id");
        return state;
      }
      const existingItem = state.cart.find((cartItem) => cartItem.id === id);

      if (existingItem) {
        if (action === "increase") {
          // Öka kvantiteten
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ),
          };
        } else if (action === "decrease") {
          // Minska kvantiteten eller ta bort
          if (existingItem.quantity > 1) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
              ),
            };
          } else {
            return {
              cart: state.cart.filter((cartItem) => cartItem.id !== id),
            };
          }
        }
      }

      // Om det inte finns, lägg till som ny (bara för increase)
      if (action === "increase" && itemData) {
        const newItem: CartItem = { ...itemData, id, quantity: 1 };
        return { cart: [...state.cart, newItem] };
      }

      console.error("Missing itemData for adding a new item to the cart");
      return state;
    }),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
