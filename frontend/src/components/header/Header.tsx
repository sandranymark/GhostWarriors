import "./Header.css";
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import cart from "../../assets/cart.svg";
import DforBreakfast from "../../assets/DforBreakfast.svg";

function Header() {
  return (
    <header className="header">
      <Link to={"/"}>
        <img src={DforBreakfast} alt="D For Breakfast logo" />
      </Link>
      <Nav />
      <div className="header__cart-btn--wrapper">
        <button className="header__btn">Login</button>
        <img className="header__cart" src={cart} alt="cart-logo" />
        <p className="header__cart-items">4</p>
      </div>
    </header>
  );
}

export default Header;

// Författare: Adréan
