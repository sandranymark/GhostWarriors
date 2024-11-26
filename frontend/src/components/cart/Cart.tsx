import "./Cart.css";
import CartItem from "../cartItem/CartItem";
import useCartStore from "../../stores/cartStore";

interface CartProps {
  isVisible: boolean;
  onClose: () => void;
}

function Cart({ isVisible, onClose }: CartProps) {
  const { cart, clearCart } = useCartStore();

  const calculateTotalPrice: () => number = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice: number = calculateTotalPrice(); // totalpris för varukorgen

  const handleOrder = (): void => {
    const cartRef = document.querySelector(".cart");
    const paymentSctionRef = document.querySelector(".payment__wrapper");

    if (cartRef) {
      cartRef.classList.remove("cart--visible");
    }

    if (paymentSctionRef) {
      paymentSctionRef.classList.remove("hide");
    }

    onClose();
  };

  return (
    <section className={`cart ${isVisible ? "cart--visible" : ""}`}>
      <div className="cart__top">
        <button className="cart__close-btn" onClick={onClose}>
          X
        </button>
        <h2 className="cart__heading">Cart</h2>
      </div>
      <section className="cart__section">
        {cart.length === 0 ? (
          <p className="cart__empty-text">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <CartItem
              key={index}
              id={item.id}
              image={item.image}
              heading={item.heading}
              price={item.price}
              quantity={item.quantity}
            />
          ))
        )}
      </section>
      <p className="cart__total">
        Total: <span className="cart__total--span">{totalPrice} :-</span>
      </p>
      <section className="cart__btn--section">
        <button className="cart__clear cart__btn" onClick={clearCart} disabled={cart.length === 0}>
          Clear
        </button>
        <button
          className="cart__order cart__btn"
          onClick={handleOrder}
          disabled={cart.length === 0}
        >
          Order
        </button>
      </section>
    </section>
  );
}

export default Cart;

// Författare: Anton & Sandra
