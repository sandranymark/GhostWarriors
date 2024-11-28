import "./PaymentConfirmed.css";
import { useCart } from "../../context/CartContext";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useState } from "react";
import { updateOrder } from "../../services/orders/orderService";

function PaymentConfirmed() {
  const { isPaymentConfirmedVisible, closePaymentConfirmed, order } = useCart();
  const [kitchenMessage, setKitchenMessage] = useState<string>("");

  const saveKitchenMessage = async () => {
    if (!order?.id) {
      return;
    }
    try {
      await updateOrder(order.id, { kitchenMessage });
      console.log("Kitchen message saved successfully!");
    } catch (error) {
      console.error("Error saving kitchen message", error);
    }
  };

  if (!isPaymentConfirmedVisible || !order) {
    return null;
  }

  return (
    <section className="paymentConfirmed__wrapper">
      <MdOutlineDownloadDone className="paymentConfirmed__icon" />
      <h2 className="paymentConfirmed__heading">Thank you for your purchase!</h2>
      <h3 className="paymentConfirmed__sent-to-kitchen">
        The order has been paid for and sent to the kitchen.
      </h3>
      <p className="paymentConfirmed__text">
        Order confirmation has been sent to:
        <span className="paymentConfirmed__email"> {order.customerContacts.email}</span>
      </p>
      <ul className="paymentConfirmed__product-wrapper">
        {order.orderItems.map((item) => (
          <span className="paymentConfirmed__product" key={item.productID}>
            <li className="paymentConfirmed__product-name"> {item.productName}:</li>
            <li className="paymentConfirmed__product-qty">x {item.productQuantity}</li>
          </span>
        ))}
        <textarea
          className="paymentConfirmed__textarea"
          value={kitchenMessage}
          placeholder="Message to kitchen..."
          onChange={(e) => setKitchenMessage(e.target.value)}
        />
      </ul>
      <span className="paymentConfirmed__order-price--container">
        <p className="paymentConfirmed__order">
          Order id: <span className="paymentConfirmed__order-id"> {order.id}</span>
        </p>
        <p className="paymentConfirmed__price-text">
          Total price: <span className="paymentConfirmed__price"> {order.totalPrice}:-</span>
        </p>
      </span>
      <span className="paymentConfirmed__btn-container">
        <button className="paymentConfirmed__button-cancel" onClick={closePaymentConfirmed}>
          Cancel order
        </button>
        <button
          className="paymentConfirmed__button-confirm"
          onClick={async () => {
            await saveKitchenMessage();
            closePaymentConfirmed();
          }}
        >
          Confirm
        </button>
      </span>
    </section>
  );
}

export default PaymentConfirmed;

// Författare Adréan
