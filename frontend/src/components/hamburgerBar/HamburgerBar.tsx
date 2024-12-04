import Nav from "../nav/Nav";
import "./HamburgerBar.css";
import { useEffect } from "react";

interface HamburgerBarProps {
  onClose: () => void;
}

function HamburgerBar({ onClose }: HamburgerBarProps) {
  useEffect(() => {
    // Lägg till "no-scroll" på body när menyn öppnas
    document.body.classList.add("no-scroll");

    return () => {
      // Ta bort "no-scroll" när menyn stängs
      document.body.classList.remove("no-scroll");
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
