import "./IncrementButton.css";
import useCartStore from "../../stores/cartStore";

interface IncrementButtonProps {
  id: string;
  heading: string;
  price: number;
  image: string;
}

function IncrementButton({ id, heading, price, image }: IncrementButtonProps) {
  const updateCart = useCartStore((state) => state.updateCart);

  // Hämta det aktuella värdet från cartStore
  const quantity: number = useCartStore(
    (state) => state.cart.find((item) => item.id === id)?.quantity || 0
  );

  function increaseValue(): void {
    if (!id || !heading || !price || !image) return;
    // Skicka id tillsammans med övriga nödvändiga data
    updateCart(id, "increase", { id, heading, price, image });
  }

  function decreaseValue(): void {
    if (quantity > 0) {
      updateCart(id, "decrease");
    }
  }

  return (
    <div className="increment-section">
      <div className="menuItem-addToCart--btn">
        <button className="decrease cart-btn" onClick={decreaseValue} disabled={quantity <= 0}>
          -
        </button>
        <div className="display-value">{quantity}</div>
        <button className="increase cart-btn" onClick={increaseValue}>
          +
        </button>
      </div>
    </div>
  );
}

export default IncrementButton;

// Författare: Anton
