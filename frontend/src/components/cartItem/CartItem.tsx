import "./CartItem.css";
import useCartStore from "../../stores/cartStore";

interface CartItemProps {
  id: string;
  image: string;
  heading: string;
  price: number;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, image, heading, price, quantity }) => {
  const updateCart = useCartStore((state) => state.updateCart);

  function handleDecrease(): void {
    updateCart(id, "decrease");
  }

  function handleIncrease(): void {
    updateCart(id, "increase");
  }

  return (
    <div className="cart-item">
      <img className="cart-item__image" src={image} alt={heading} />
      <div className="cart-item__details">
        <h3>{heading}</h3>
        <p>{price} SEK</p>
        <div className="cart-item__quantity">
          <button onClick={handleDecrease} className="cart-btn">
            -
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} className="cart-btn">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

// Författare Anton
