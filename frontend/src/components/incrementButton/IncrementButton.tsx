import "./IncrementButton.css";
import useCartStore from "../../stores/cartStore";

interface IncrementButtonProps {
  id: string;
  heading: string;
  price: number;
  image: string;
}

function IncrementButton({ id, heading, price, image }: IncrementButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  // Hämta det aktuella värdet från cartStore
  const quantity = useCartStore(
    (state) => state.cart.find((item) => item.id === id)?.quantity || 0
  );

  const increaseValue = () => {
    if (!id || !heading || !price || !image) {
      return;
    }
    addToCart({ id, heading, price, image });
  };

  const decreaseValue = () => {
    if (quantity > 0) {
      decreaseQuantity(id);
    }
  };

  return (
    <div className="increment-section">
      <div className="menuItem-addToCart--btn">
        <button className="decrease cart-btn" onClick={decreaseValue} disabled={quantity <= 0}>
          -
        </button>
        <div className="display-value">{quantity}</div> {/* Visa global quantity */}
        <button className="increase cart-btn" onClick={increaseValue}>
          +
        </button>
      </div>
    </div>
  );
}

export default IncrementButton;

// Författare: Anton
