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
    const navRef = document.querySelector(".nav") as HTMLElement;
    const hamburgerRef = document.querySelector(".hamburger") as HTMLElement;
    const headerLogoRef = document.querySelector(".header__logo") as HTMLImageElement;
    const headerLinkAroundLogoRef = document.querySelector(".header__link") as HTMLLinkElement;

    if (!hamburgerRef) {
      return;
    } else {
      hamburgerRef.addEventListener("click", () => {
        setIsHamburgerVisible(true);
        navRef.classList.remove("hide");
        hamburgerRef.classList.add("hide");
        headerLogoRef.classList.add("hide");
        headerLinkAroundLogoRef.classList.add("hide");
      });
    }

    return () => {
      hamburgerRef?.removeEventListener("click", () => {});
    };
  }, []);

  function handleLogin(): void {
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    const loginFormRef = document.querySelector(".login-form") as HTMLFormElement;
    if (!loginSectionRef) {
      return;
    } else {
      loginSectionRef.style.display = "flex";
      loginSectionRef.classList.remove("hide");
    }
    if (!loginFormRef) {
      return;
    } else {
      loginFormRef.classList.add("animate");
    }
  }

  return (
    <header className="header">
      <Link className="header__link" to={"/"}>
        <img className="header__logo" src={DforBreakfast} alt="D For Breakfast logo" />
      </Link>
      <Nav />
      <div className="header__cart-btn--wrapper">
        <button className="header__btn" onClick={handleLogin}>
          Login
        </button>
        <img className="header__cart" src={cart} alt="cart-logo" />
        <p className="header__cart-items">2</p>
      </div>

      <nav className="hamburger">
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
