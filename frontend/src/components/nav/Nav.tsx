import "./Nav.css";
import { Link } from "react-router-dom";

interface NavProps {
  className?: string;
  onClose?: () => void;
}

function Nav({ className = "", onClose }: NavProps) {
  function removeScrollOnBody(): void {
    const bodyRef = document.querySelector("body") as HTMLBodyElement;
    if (bodyRef.classList.contains("no-scroll")) {
      bodyRef.classList.remove("no-scroll");
    }
  }
  function handleLinkClick(): void {
    if (onClose) {
      onClose();
    }
    removeScrollOnBody();
  }

  return (
    <nav className={`nav ${className}`}>
      <ul className="nav__ul">
        <li className="nav__li">
          <Link className="nav__link" to={"/"} onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/about"} onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/contact"} onClick={handleLinkClick}>
            Contact
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/menu"} onClick={handleLinkClick}>
            Menu
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

// Författare: Adréan
