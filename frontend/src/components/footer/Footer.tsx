import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <IoMailOutline className="footer__mail-icon" />
        <p className="footer__mail">min@mail.com</p>
      </div>
      <p className="footer__address">Bortom Horisonten 1, 888 88 Ingenmansland</p>
      <div>
        <FaFacebook className="footer__facebook-icon" />
        <FaInstagram className="footer__instagram-icon" />
      </div>
    </footer>
  );
}

export default Footer;

// Författare: Adréan
