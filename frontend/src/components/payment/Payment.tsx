import "./Payment.css";
import { useState } from "react";
import { FormData } from "../../types/formData";
import { CartItem } from "../../types/cartType";
import useCartStore from "../../stores/cartStore";
import { handlePayment } from "./../../services/payment/paymentService";

function Payment() {
  const { cart, clearCart } = useCartStore(); // Hämta data från hooken här

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    mm: "",
    yy: "",
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const resetForm = () => {
    const paymentSectionRef = document.querySelector(".payment__wrapper");
    if (paymentSectionRef) {
      paymentSectionRef.classList.add("hide");
    }
    setFormData({
      name: "",
      email: "",
      cardNumber: "",
      cvv: "",
      mm: "",
      yy: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = (): void => {
    const paymentSectionRef = document.querySelector(".payment__wrapper");
    if (paymentSectionRef) {
      paymentSectionRef.classList.add("hide");
    }
  };

  return (
    <section className="payment__wrapper hide">
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
            onChange={handleInputChange}
          />
          <input
            className="payment__inputField"
            type="text"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="payment__inputField"
            type="text"
            name="cardNumber"
            placeholder="Card number"
            value={formData.cardNumber}
            onChange={handleInputChange}
          />
          <input
            className="payment__inputField"
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleInputChange}
          />
          <div className="payment__date-btn-wrapper">
            <input
              className="payment__inputField month-year"
              type="text"
              name="mm"
              placeholder="MM"
              value={formData.mm}
              onChange={handleInputChange}
            />
            <input
              className="payment__inputField month-year"
              type="text"
              name="yy"
              placeholder="YY"
              value={formData.yy}
              onChange={handleInputChange}
            />
            <button
              className="payment__btn"
              onClick={(e) => {
                e.preventDefault();
                handlePayment(
                  formData,
                  cart,
                  clearCart, // Funktion för att rensa varukorgen
                  resetForm,
                  setErrorMsg
                );
              }}
            >
              Pay now!
            </button>
          </div>
        </div>
      </form>
      <p className="payment__close-btn" onClick={handleClose}>
        X
      </p>
    </section>
  );
}

export default Payment;
