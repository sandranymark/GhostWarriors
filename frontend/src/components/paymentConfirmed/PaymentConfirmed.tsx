import "./PaymentConfirmed.css";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { MdOutlineDownloadDone } from "react-icons/md";
import { updateOrder, deleteOrder, getOrderStatusById } from "../../services/orders/orderService";
import axios from "axios";

function PaymentConfirmed() {
  const { isPaymentConfirmedVisible, closePaymentConfirmed, order } = useCart();
  const [kitchenMessage, setKitchenMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const closeAndReset = () => {
    setErrorMsg("");
    setKitchenMessage("");
    closePaymentConfirmed();
  };

  const saveKitchenMessage = async (): Promise<void> => {
    if (!order?.id) {
      return;
    }

    try {
      const currentStatus = await getOrderStatusById(order.id); // Använd rätt funktion
      const currentOrderStatus = currentStatus.orderStatus;

      // Kontrollera att orderStatus existerar
      if (!currentStatus?.orderStatus) {
        setErrorMsg("Order status is unavailable. Please try again later.");
        return;
      }

      // Om status är "pending", uppdatera ordern och avsluta funktionen
      if (currentOrderStatus === "Pending") {
        console.log("kitchenMessage före:", kitchenMessage);

        await updateOrder(order.id, { kitchenMessage });
        console.log("kitchenMessage efter:", kitchenMessage);
        closeAndReset();
        return;
      }

      // Om status är "Preparing" eller "Done", visa felmeddelande
      if (currentOrderStatus === "Preparing" || currentOrderStatus === "Done") {
        setErrorMsg("Cannot add a kitchen message. Order is locked or completed.");
        return; // Låt användaren stänga sidan manuellt
      }

      // Hantera andra statusar
      setErrorMsg("Cannot add a kitchen message. Order is no longer Pending.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data?.message || error.message);
        setErrorMsg("Failed to save kitchen message. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        setErrorMsg("Failed to save kitchen message. Please try again.");
      }
    }
  };

  const handleDeleteOrder = async (): Promise<void> => {
    if (!order?.id) {
      return;
    }
    try {
      const currentStatus = await getOrderStatusById(order.id); // Använd rätt funktion
      const currentOrderStatus = currentStatus.orderStatus;

      if (currentOrderStatus !== "Pending") {
        setErrorMsg("Cannot cancel order. Order is no longer pending."); // Går så fort att meddelandet syns inte
        return;
      }

      await deleteOrder(order.id);
      closeAndReset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data?.message || error.message);
        setErrorMsg("Failed to delete order. Please try again.");
      } else {
        console.error("Unexpected error:", error);
        setErrorMsg("Failed to delete order. Please try again.");
      }
    }
  };

  if (!isPaymentConfirmedVisible || !order) {
    return null;
  }

  return (
    <section className="paymentConfirmed__wrapper">
      <div className="paymentConfirmed__inner-wrapper">
        <MdOutlineDownloadDone className="paymentConfirmed__icon" />
        <h2 className="paymentConfirmed__heading">Thank you for your purchase!</h2>
        <h3 className="paymentConfirmed__sent-to-kitchen">
          The order has been paid for and sent to the kitchen.
        </h3>
        <p className="paymentConfirmed__text">
          Order confirmation has been sent to:
          <span className="paymentConfirmed__email"> {order.customerContacts.email}</span>
        </p>
        {errorMsg && (
          <div className="paymentConfirmed__error-container">
            <p className="paymentConfirmed__error">{errorMsg}</p>
            <button className="paymentConfirmed__close-error-btn" onClick={closeAndReset}>
              Close
            </button>
          </div>
        )}
        <ul className="paymentConfirmed__product-wrapper">
          {order.orderItems.map((item) => (
            <span className="paymentConfirmed__product" key={item.productID}>
              <li className="paymentConfirmed__product-name"> {item.productName}:</li>
              <div>
                <li className="paymentConfirmed__product-qty">
                  {item.productQuantity}x {item.productPrice}:-
                </li>
              </div>
            </span>
          ))}
          <textarea
            aria-label="text area"
            className="paymentConfirmed__textarea"
            value={kitchenMessage}
            placeholder="Message to kitchen..."
            onChange={(e) => setKitchenMessage(e.target.value)}
          />
        </ul>
        <span className="paymentConfirmed__order-price--container">
          <p className="paymentConfirmed__order">
            Order id: <span className="paymentConfirmed__order-id"> {order?.id || null}</span>
          </p>
          <p className="paymentConfirmed__price-text">
            Total price: <span className="paymentConfirmed__price"> {order.totalPrice}:-</span>
          </p>
        </span>
        <span className="paymentConfirmed__btn-container">
          <button className="paymentConfirmed__button-cancel" onClick={handleDeleteOrder}>
            Cancel order
          </button>
          <button className="paymentConfirmed__button-confirm" onClick={saveKitchenMessage}>
            Confirm
          </button>
        </span>
      </div>
    </section>
  );
}

export default PaymentConfirmed;

// Författare Adréan
