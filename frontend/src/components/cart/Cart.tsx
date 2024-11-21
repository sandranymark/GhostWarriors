import useCartStore from "../../stores/cartStore";
import "./Cart.css";
import CartItem from "../cartItem/CartItem";

interface CartProps {
  isVisible: boolean;
  onClose: () => void;
}

function Cart({ isVisible, onClose }: CartProps) {
  const { cart, clearCart } = useCartStore();
  console.log('Current cart', cart);

  return (
    <section className={`cart ${isVisible ? "cart--visible" : ""}`}>
      <div className="cart__top">
        <button className="cart__close-btn" onClick={onClose}>
          X
        </button>
        <h2>Cart</h2>
      </div>
      <section className="cart__section">
        {cart.length === 0 ? (
          <p>Items will appear here.</p>
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
      <section className="cart__btn--section">
        <button className="cart__clear cart__btn" onClick={clearCart}>Clear</button>
        <button className="cart__order cart__btn">Order</button>
      </section>
    </section>
  );
}

export default Cart;

// Författare: Anton
