import "./Header.css";
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import cartImage from "../../assets/cart.svg";
import { useEffect, useState } from "react";
import HamburgerBar from "../hamburgerBar/HamburgerBar";
import DforBreakfast from "../../assets/DforBreakfast.svg";
import { useCart } from "../../context/CartContext";
import useCartStore from "./../../stores/cartStore";

function Header() {
  const [isHamburgerVisible, setIsHamburgerVisible] = useState<boolean>(false);
  const { toggleCartVisibility } = useCart();
  const cart = useCartStore((state) => state.cart);
  const quantity = cart.reduce((total, item) => total + item.quantity, 0); // Summerar total kvantitet

  // const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  // const toggleCartVisibility = () => {
  //   setIsCartVisible(!isCartVisible)
  //   console.log(isCartVisible);
  // }

  useEffect(() => {
    const navRef = document.querySelector(".nav") as HTMLElement;
    const bodyRef = document.querySelector("body") as HTMLBodyElement;
    const hamburgerRef = document.querySelector(".hamburger") as HTMLElement;
    const headerLogoRef = document.querySelector(".header__logo") as HTMLImageElement;
    const headerLinkAroundLogoRef = document.querySelector(".header__link") as HTMLLinkElement;
    const cartBtnWrapperRef = document.querySelector(".header__cart-btn--wrapper") as HTMLElement;

    const handleHamburgerClick = () => {
      setIsHamburgerVisible(true);
      navRef?.classList.remove("hide");
      bodyRef?.classList.add("no-scroll");
      hamburgerRef?.classList.add("hide");
      headerLogoRef?.classList.add("hide");
      cartBtnWrapperRef?.classList.add("hide");
      headerLinkAroundLogoRef?.classList.add("hide");
    };

    if (hamburgerRef) {
      hamburgerRef.addEventListener("click", handleHamburgerClick);
    }

    return () => {
      hamburgerRef?.removeEventListener("click", () => {});
    };
  }, []);

  function handleLogin(): void {
    const loginSectionRef = document.querySelector(".login-wrapper") as HTMLElement;
    const firstSectionRef = document.querySelector(".app > section:nth-child(2)") as HTMLElement;
    if (loginSectionRef) {
      loginSectionRef.style.display = "flex";
      loginSectionRef.classList.remove("hide");
      loginSectionRef.classList.add("animate");
      firstSectionRef.style.filter = "blur(10px)";
    }
  }

  return (
    <header className="header">
      <Link className="header__link" to={"/"}>
        <img className="header__logo" src={DforBreakfast} alt="D For Breakfast logo" />
      </Link>
      <Nav />
      <div className="header__cart-btn--wrapper">
        <button className="header__login-btn" onClick={handleLogin}>
          Login
        </button>
        <div className="header__cart--wrapper" onClick={toggleCartVisibility}>
          <img className="header__cart" src={cartImage} alt="cart-logo" />
          <p className="header__cart-items">{quantity}</p>
        </div>
      </div>

      <nav className="hamburger">
        <hr className="hamburger-line" />
        <hr className="hamburger-line" />
        <hr className="hamburger-line" />
      </nav>

      {isHamburgerVisible && <HamburgerBar onClose={() => setIsHamburgerVisible(false)} />}
      {/* <Cart isVisible={isCartVisible} onClose={() => setIsCartVisible(false)} /> */}
    </header>
  );
}

export default Header;

// Författare: Adréan
// Modifierad: Anton - Import av Cart samt CartContext
