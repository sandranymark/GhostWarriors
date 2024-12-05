import "./HamburgerBar.css";
import Nav from "../nav/Nav";
import { useEffect } from "react";

interface HamburgerBarProps {
  onClose: () => void;
}

function HamburgerBar({ onClose }: HamburgerBarProps) {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    const addProductBtnRef = document.querySelector(".addProduct__btn") as HTMLButtonElement | null;

    if (addProductBtnRef) {
      addProductBtnRef.style.position = "unset";
    }

    return () => {
      document.body.classList.remove("no-scroll");

      if (addProductBtnRef) {
        addProductBtnRef.style.position = "fixed";
      }
    };
  }, []);

  return (
    <section className="hamburgerBar-section">
      <p className="hamburgerBar__close-btn" onClick={onClose}>
        X
      </p>
      <Nav className="hamburger-nav" onClose={onClose} />
    </section>
  );
}

export default HamburgerBar;

// Författare Adréan
