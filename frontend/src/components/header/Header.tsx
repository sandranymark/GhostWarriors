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
      <button className="header__btn">Login</button>
      <img className="header__cart" src={cart} alt="cart-logo" />
    </header>
  );
}

export default Header;

// Författare: Adréan
