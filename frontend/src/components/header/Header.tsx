import "./Header.css";
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import cart from "../../assets/cart.svg";
import { useEffect, useState } from "react";
import HamburgerBar from "../hamburgerBar/HamburgerBar";
import DforBreakfast from "../../assets/DforBreakfast.svg";

function Header() {
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);

  useEffect(() => {
    const hamburgerRef = document.querySelector(".hamburger") as HTMLElement;
    const headerLogoRef = document.querySelector(".header__logo") as HTMLImageElement;
    const headerLinkAroundLogoRef = document.querySelector(".header__link") as HTMLLinkElement;
    const navRef = document.querySelector(".nav") as HTMLElement;
    if (!hamburgerRef) {
      return;
    } else {
      hamburgerRef.addEventListener("click", () => {
        setIsHamburgerVisible(true);
        navRef.classList.remove("hide");
        headerLogoRef.classList.add("hide");
        headerLinkAroundLogoRef.classList.add("hide");
        hamburgerRef.style.display = "none";
      });
    }

    return () => {
      hamburgerRef?.removeEventListener("click", () => {});
    };
  }, []);

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

      <nav className="hamburger hide">
        <hr className="hamburger-line" />
        <hr className="hamburger-line" />
        <hr className="hamburger-line" />
      </nav>

      {isHamburgerVisible && <HamburgerBar onClose={() => setIsHamburgerVisible(false)} />}
    </header>
  );
}

export default Header;

// Författare: Adréan
