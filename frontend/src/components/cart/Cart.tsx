import "./Cart.css";
import CartItem from "../cartItem/CartItem";
import useCartStore from "../../stores/cartStore";
import { createOrder } from "../../services/orders/orderService";

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

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderItems = cart.map((item) => ({
      productID: item.id,
      productName: item.heading,
      productPrice: item.price,
      productTotalPrice: item.price * item.quantity,
      productQuantity: item.quantity,
    }));

    const totalPrice = orderItems.reduce((total, item) => total + item.productTotalPrice, 0);

    const newOrder = {
      orderStatus: "pending",
      orderItems,
      totalPrice,
      customerID: "cust12334",
      paymentStatus: "pending",
      customerName: "Sandra Suger",
      customerContacts: {
        email: "john@example.com",
        phone: "1234567890",
      },
    };

    try {
      const response = await createOrder(newOrder);
      console.log("Order created:", response);
      alert("Order successfully created!");
      clearCart(); // Töm varukorgen efter lyckad order
      onClose(); // Stäng varukorgen
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    }
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
        <button className="cart__clear cart__btn" onClick={clearCart}>
          Clear
        </button>
        <button className="cart__order cart__btn" onClick={handleOrder}>
          Order
        </button>
      </section>
    </section>
  );
}

export default Cart;

// Författare: Anton & Sandra
