import "./Payment.css";
import { useState } from "react";
import { paymentSchema } from "../../models/paymentSchema";
import PaymentConfirmed from "../paymentConfirmed/PaymentConfirmed";

function Payment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    mm: "",
    yy: "",
  });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  const handleClose = (): void => {
    const paymentSctionRef = document.querySelector(".payment__wrapper");
    paymentSctionRef?.classList.add("hide");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Dynamisk uppdatering av rätt fält
  };

  const handlePayment = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setErrorMsg(""); // Rensa tidigare felmeddelanden

    const paymentConfirmedRef = document.querySelector(".paymentConfirmed__wrapper");
    const paymentWrapperRef = document.querySelector(".payment__wrapper");
    if (paymentConfirmedRef && paymentWrapperRef) {
      paymentWrapperRef.classList.add("hide");
      paymentConfirmedRef.classList.remove("hide");
    }

    console.log("Form data before validation:", formData);

    // Validera data med Joi
    const { error } = paymentSchema.validate(formData, { abortEarly: false });

    if (error) {
      // Hantera valideringsfel
      const errorMessage = error.details[0].message;
      setErrorMsg(errorMessage);
      return;
    }

    setPaymentConfirmed(true);
  };

  if (paymentConfirmed) {
    return <PaymentConfirmed />;
  }

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
            <button className="payment__btn" onClick={(e) => handlePayment(e)}>
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
