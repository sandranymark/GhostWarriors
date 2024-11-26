import "./PaymentConfirmed.css";
import { MdOutlineDownloadDone } from "react-icons/md";

function PaymentConfirmed() {
  function handleClose(): void {
    const paymentConfirmedSectionRef = document.querySelector(
      ".paymentConfirmed__wrapper"
    ) as HTMLElement;
    if (paymentConfirmedSectionRef) {
      paymentConfirmedSectionRef.classList.add("hide");
    }
  }

  return (
    <section className="paymentConfirmed__wrapper hide">
      <MdOutlineDownloadDone className="paymentConfirmed__icon" />
      <h2 className="paymentConfirmed__heading">Thank you very much for your purchase!</h2>
      <h3 className="paymentConfirmed__sent-to-kitchen">
        The order has been paid for and sent to the kitchen.
      </h3>
      <p className="paymentConfirmed__text">
        Order confirmation has been sent to:
        <span className="paymentConfirmed__email"> min@epost.nu</span>
      </p>
      <p className="paymentConfirmed__price-text">
        Total price: <span className="paymentConfirmed__price"> 120:-</span>
      </p>
      <p className="paymentConfirmed__button" onClick={handleClose}>
        Got It!
      </p>
      <p className="paymentConfirmed__close-btn" onClick={handleClose}>
        X
      </p>
    </section>
  );
}

export default PaymentConfirmed;
