export interface CartItem {
  id: string;
  image: string;
  heading: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  updateCart: (
    id: string,
    action: "increase" | "decrease",
    itemData?: Omit<CartItem, "quantity">
  ) => void;
  clearCart: () => void;
}

// Författare Adréan, Sandra, Anton
