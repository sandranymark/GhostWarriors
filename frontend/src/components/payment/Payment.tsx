import "./Payment.css";
import { useState } from "react";
import { FormData } from "../../types/formData";
import useCartStore from "../../stores/cartStore";
import { paymentSchema } from "../../models/paymentSchema";
import { createOrder } from "../../services/orders/OrderService";

function Payment() {
  function resetForm() {
    const paymentSectionRef = document.querySelector(".payment__wrapper");
    if (paymentSectionRef) {
      paymentSectionRef.classList.add("hide"); // Dölj betalningsvyn
    }
    setPaymentConfirmed(false);
    setFormData({
      name: "",
      email: "",
      cardNumber: "",
      cvv: "",
      mm: "",
      yy: "",
    });
  }

  const { cart, clearCart } = useCartStore();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    cardNumber: "",
    cvv: "",
    mm: "",
    yy: "",
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [orderCreated, setOrderCreated] = useState<boolean>(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState<boolean>(false);

  const handleClose = (): void => {
    const paymentSctionRef = document.querySelector(".payment__wrapper");
    if (paymentSctionRef) {
      paymentSctionRef.classList.add("hide");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Dynamisk uppdatering av rätt fält
  };

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMsg(""); // Rensa tidigare felmeddelanden
    // Validera data med Joi
    const { error } = paymentSchema.validate(formData, { abortEarly: false });

    if (error) {
      // Hantera valideringsfel
      const errorMessage = error.details[0].message;
      setErrorMsg(errorMessage);
      return;
    }
    // Om validering är godkänd, fortsätt med att visa PaymentConfirmed

    const paymentWrapperRef = document.querySelector(".payment__wrapper");
    const paymentConfirmedRef = document.querySelector(".paymentConfirmed__wrapper");

    if (paymentConfirmedRef) {
      paymentConfirmedRef.classList.remove("hide");
    }
    if (paymentWrapperRef) {
      paymentWrapperRef.classList.add("hide");
    }
    try {
      // Skapa order endast om cart inte är tom och ingen order redan har skapats
      if (cart.length > 0) {
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
          customerName: formData.name,
          customerContacts: {
            email: formData.email,
          },
        };

        const response = await createOrder(newOrder);
        console.log("Order created:", response);

        setOrderCreated(true); // Markera att ordern har skapats
        clearCart(); // Töm varukorgen

        if (orderCreated) {
          console.log("Order redan skapad, inget mer görs.");
          return;
        }
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }

    clearCart();
    resetForm();
    setPaymentConfirmed(true);
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
