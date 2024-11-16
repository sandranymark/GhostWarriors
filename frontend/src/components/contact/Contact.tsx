import "./Contact.css";
import brunchBg from "../../assets/brunchBg.svg";

function Contact() {
  return (
    <section className="contact-section">
      <img className="contact-image" src={brunchBg} alt="breakfast image" />
      <article className="contact-article">
        <span className="contact-heading__wrapper">
          <h1 className="contact-heading">
            Kontakta <span className="contact-heading--orange">oss</span>!
          </h1>
        </span>
        <span className="contact-wrapper">
          <span className="contact-wrapper__box">
            <h2 className="contact-info-heading">Mail</h2>
            <p className="contact-info-text">Jesper.Nyberg@DforBreakfast.com</p>
          </span>
          <span className="contact-wrapper__box">
            <h2 className="contact-info-heading">Adress</h2>
            <p className="contact-info-text">Bortom Horisonten 1, 888 88 Ingenmansland</p>
          </span>
          <span className="contact-wrapper__box">
            <h2 className="contact-info-heading">Telefon</h2>
            <p className="contact-info-text">070-123 45 67</p>
          </span>
        </span>
      </article>
    </section>
  );
}

export default Contact;

// Författare: Adréan
