import "./Cart.css";

interface CartProps {
  isVisible: boolean;
  onClose: () => void;
}

function Cart({ isVisible, onClose }: CartProps) {
  return (
    <section className={`cart ${isVisible ? "cart--visible" : ""}`}>
      <div className="cart__top">
        <button className="cart__close-btn" onClick={onClose}>
          X
        </button>
        <h2>Cart</h2>
      </div>
      <section className="cart__section">
        <p>Items will appear here.</p>
      </section>
      <section className="cart__btn--section">
        <button className="cart__clear cart__btn">Clear</button>
        <button className="cart__order cart__btn">Order</button>
      </section>
    </section>
  );
}

export default Cart;

// Författare: Anton
