import "./Payment.css";
import { useState } from "react";
import { FormData } from "../../types/formData";
import useCartStore from "../../stores/cartStore";
import { useCart } from "../../context/CartContext";
import PaymentConfirmed from "../paymentConfirmed/PaymentConfirmed";
import { handlePayment } from "./../../services/payment/paymentService";

function Payment() {
  const { cart, clearCart } = useCartStore();
  const { isPaymentVisible, closePayment, showPaymentConfirmed, setOrder } = useCart();

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    mm: "",
    yy: "",
  });

  const handlePaymentSuccess = () => {
    setFormData({
      name: "",
      email: "",
      cardNumber: "",
      cvv: "",
      mm: "",
      yy: "",
    });
    showPaymentConfirmed();
  };

  if (!isPaymentVisible) {
    return null;
  }

  return (
    <>
      {isPaymentVisible && (
        <section className="payment__wrapper">
          {errorMsg && <p className="payment__errorMsg">{errorMsg}</p>}
          <form className="payment__form">
            <div className="payment__container">
              <p className="payment__heading">Enter details</p>
              <input
                className="payment__inputField"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
              <input
                className="payment__inputField"
                type="text"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
              <input
                className="payment__inputField"
                type="text"
                name="cardNumber"
                placeholder="Card number"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
              <input
                className="payment__inputField"
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
              <div className="payment__date-btn-wrapper">
                <input
                  className="payment__inputField month-year"
                  type="text"
                  name="mm"
                  placeholder="MM"
                  value={formData.mm}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
                <input
                  className="payment__inputField month-year"
                  type="text"
                  name="yy"
                  placeholder="YY"
                  value={formData.yy}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
                <button
                  className="payment__btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePayment(
                      formData,
                      cart,
                      clearCart,
                      handlePaymentSuccess,
                      setErrorMsg,
                      setOrder
                    );
                  }}
                >
                  Pay now!
                </button>
              </div>
            </div>
          </form>
          <p className="payment__close-btn" onClick={closePayment}>
            X
          </p>
        </section>
      )}
      <PaymentConfirmed />
    </>
  );
}

export default Payment;
