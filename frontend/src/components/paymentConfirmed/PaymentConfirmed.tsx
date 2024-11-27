import "./PaymentConfirmed.css";
import { useCart } from "../../context/CartContext";
import { MdOutlineDownloadDone } from "react-icons/md";

function PaymentConfirmed() {
  const { isPaymentConfirmedVisible, closePaymentConfirmed, order } = useCart();

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
      <p className="paymentConfirmed__price-text">
        Total price: <span className="paymentConfirmed__price">{order.totalPrice}:-</span>
      </p>
      <p className="paymentConfirmed__order">
        Order id: <span className="paymentConfirmed__order-id">{order.id}</span>
      </p>
      <p className="paymentConfirmed__button" onClick={closePaymentConfirmed}>
        Got It!
      </p>
    </section>
  );
}

export default PaymentConfirmed;

// Författare Adréan
