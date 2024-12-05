import "./Header.css";
import Nav from "../nav/Nav";
import { useEffect } from "react";
import Login from "../login/Login";
import Register from "../register/Register";
import cartImage from "../../assets/cart.svg";
import useAuthStore from "../../stores/authStore";
import { useCart } from "../../context/CartContext";
import useCartStore from "./../../stores/cartStore";
import { Link, useNavigate } from "react-router-dom";
import useHeaderStore from "../../stores/headerStore";
import HamburgerBar from "../hamburgerBar/HamburgerBar";
import DforBreakfast from "../../assets/DforBreakfast.svg";
import { logoutUser } from "../../services/auth/authService";

function Header() {
  const navigate = useNavigate();

  const { toggleCartVisibility } = useCart();

  const cart = useCartStore((state) => state.cart);
  const quantity = cart.reduce((total, item) => total + item.quantity, 0);

  const setUser = useAuthStore((state) => state.setUser);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const isLoginVisible = useHeaderStore((state) => state.isLoginVisible);
  const isHamburgerVisible = useHeaderStore((state) => state.isHamburgerVisible);
  const isRegisterVisible = useHeaderStore((state) => state.isRegisterVisible);
  const setLoginVisible = useHeaderStore((state) => state.setLoginVisible);
  const setHamburgerVisible = useHeaderStore((state) => state.setHamburgerVisible);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (token && user) {
      setIsLoggedIn(true);
      setUser(user);
    } else {
      setUser(null);
      setLoading(false);
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, setUser, setLoading]);

  const handleLogin = (): void => {
    setLoginVisible(true);
  };

  const handleLogout = (): void => {
    logoutUser();
    navigate("/");
    setIsLoggedIn(false);
  };

  const closeLogin = (): void => {
    setLoginVisible(false);
  };

  return (
    <>
      <header className={`header ${isHamburgerVisible ? "header--hamburger-open" : ""}`}>
        <Link className="header__link" to={"/"}>
          <img className="header__logo" src={DforBreakfast} alt="D For Breakfast logo" />
        </Link>
        <Nav />
        <div className="header__cart-btn--wrapper">
          {isLoggedIn ? (
            <button className="header__logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="header__login-btn" onClick={handleLogin}>
              Login
            </button>
          )}
          <div className="header__cart--wrapper" onClick={toggleCartVisibility}>
            <img className="header__cart" src={cartImage} alt="cart-logo" />
            <p className="header__cart-items">{quantity}</p>
          </div>
        </div>

        <nav
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setHamburgerVisible(true)}
        >
          <hr className="hamburger-line" />
          <hr className="hamburger-line" />
          <hr className="hamburger-line" />
        </nav>

        {isHamburgerVisible && <HamburgerBar onClose={() => setHamburgerVisible(false)} />}
      </header>

      <Login className={isLoginVisible ? "animate" : "hide"} onClose={closeLogin} />
      {isRegisterVisible && <Register />}
    </>
  );
}

export default Header;

// Författare Adréan
