import { createContext, useContext, useState, ReactNode } from "react";
import { Order } from "../types/orderType";

interface CartContextProps {
  isCartVisible: boolean;
  isPaymentVisible: boolean;
  isPaymentConfirmedVisible: boolean;
  toggleCartVisibility: () => void;
  showPayment: () => void;
  closePayment: () => void;
  showPaymentConfirmed: () => void;
  closePaymentConfirmed: () => void;
  order: Order | null;
  setOrder: (order: Order) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Skapar en CartProvider för att dela Context värdena
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState<boolean>(false);
  const [isPaymentConfirmedVisible, setIsPaymentConfirmedVisible] = useState<boolean>(false);

  const toggleCartVisibility = () => {
    const bodyRef = document.querySelector("body") as HTMLBodyElement;
    bodyRef.classList.add("no-scroll");
    setIsCartVisible((prev) => !prev);
    if (isCartVisible === true) {
      bodyRef.classList.remove("no-scroll");
    }
  };

  const showPayment = () => {
    setIsCartVisible(false);
    setIsPaymentVisible(true);
  };

  const closePayment = () => {
    setIsPaymentVisible(false);
  };

  const showPaymentConfirmed = () => {
    setIsPaymentVisible(false);
    setIsPaymentConfirmedVisible(true);
  };

  const closePaymentConfirmed = () => {
    setIsPaymentConfirmedVisible(false);
    const bodyRef = document.querySelector("body") as HTMLBodyElement;
    bodyRef.classList.remove("no-scroll");
  };

  // Returnerar en Prover komponent som delar värden vidare till barn komponenter
  return (
    <CartContext.Provider
      value={{
        isCartVisible,
        isPaymentVisible,
        isPaymentConfirmedVisible,
        toggleCartVisibility,
        showPayment,
        closePayment,
        showPaymentConfirmed,
        closePaymentConfirmed,
        order,
        setOrder,
      }}
    >
      {children} {/* Allt som omsluts av CartProvider kan ta ovanstående props */}
    </CartContext.Provider>
  );
};

// Hook för att kunna använda CartContext i andra komponenter
export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Författare: Anton
// modifierare: Adréan
// order,
// setOrder,
// showPayment,
// closePayment,
// isPaymentVisible,
// toggleCartVisibility,
// showPaymentConfirmed,
// closePaymentConfirmed,
// isPaymentConfirmedVisible,
