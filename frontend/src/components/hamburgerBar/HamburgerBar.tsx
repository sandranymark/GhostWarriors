import Nav from "../nav/Nav";
import "./HamburgerBar.css";
import { useEffect } from "react";

interface HanburgerBarProps {
  onClose: () => void;
}

function HamburgerBar({ onClose }: HanburgerBarProps) {
  useEffect(() => {
    const hamburgerBarCloseBtnRef = document.querySelector(
      ".hamburgerBar__close-btn"
    ) as HTMLParagraphElement;
    const hamburgerRef = document.querySelector(".hamburger") as HTMLElement;
    const headerLogoRef = document.querySelector(".header__logo") as HTMLImageElement;
    const headerLinkAroundLogoRef = document.querySelector(".header__link") as HTMLLinkElement;
    const navRef = document.querySelector(".nav") as HTMLElement;

    const handleClose = (): void => {
      headerLogoRef.classList.remove("hide");
      headerLinkAroundLogoRef.classList.remove("hide");
      navRef.classList.add("hide");
      hamburgerRef.style.display = "flex";
      onClose();
    };

    // Lägg till event listener
    hamburgerBarCloseBtnRef?.addEventListener("click", handleClose);

    // Ta bort event listener när komponenten avmonteras
    return () => {
      hamburgerBarCloseBtnRef?.removeEventListener("click", handleClose);
    };
  }, [onClose]);

  return (
    <section className="hamburgerBar-section">
      <p className="hamburgerBar__close-btn" onClick={onClose}>
        X
      </p>
      <Nav className="hamburger-nav" />
    </section>
  );
}

export default HamburgerBar;
