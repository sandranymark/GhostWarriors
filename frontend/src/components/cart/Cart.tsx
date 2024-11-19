import "./Cart.css";

interface CartProps {
    isVisible: boolean; 
    onClose: () => void; 
  }
  

function Cart({ isVisible, onClose } : CartProps) {
  return (
    <div className={`cart ${isVisible ? "cart--visible" : ""}`}>
      <button className="cart__close-btn" onClick={onClose}>
        X
      </button>
      <h2>Your Cart</h2>
      <p>Items will appear here.</p>
    </div>
  );
}

export default Cart;
