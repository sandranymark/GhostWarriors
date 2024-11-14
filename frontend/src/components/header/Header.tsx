import "./Header.css";
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import cart from "../../assets/cart.svg";
import DforBreakfast from "../../assets/DforBreakfast.svg";

function Header() {
  return (
    <header className="header">
      <Link className="header__link" to={"/"}>
        <img className="header__logo" src={DforBreakfast} alt="D For Breakfast logo" />
      </Link>
      <Nav />
      <div className="header__cart-btn--wrapper">
        <button className="header__btn">Login</button>
        <img className="header__cart" src={cart} alt="cart-logo" />
        <p className="header__cart-items"></p>
      </div>
      <nav className="hamburger">
        <hr className="hamburger-line" />
        <hr className="hamburger-line" />
        <hr className="hamburger-line" />
      </nav>
    </header>
  );
}

export default Header;

// Författare: Adréan
