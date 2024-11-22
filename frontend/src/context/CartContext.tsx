import { createContext, useContext, useState, ReactNode } from "react";

interface CartContextProps {
  isCartVisible: boolean;
  toggleCartVisibility: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Skapar en CartProvider för att dela Context värdena
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    const bodyRef = document.querySelector("body") as HTMLBodyElement;
    bodyRef.classList.add("no-scroll");
    setIsCartVisible((prev) => !prev);
    if (isCartVisible === true) {
      bodyRef.classList.remove("no-scroll");
    }
  };

  // Returnerar en Prover komponent som delar värden vidare till barn komponenter
  return (
    <CartContext.Provider value={{ isCartVisible, toggleCartVisibility }}>
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
