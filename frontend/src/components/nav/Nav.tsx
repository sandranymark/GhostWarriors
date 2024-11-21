import { Link } from "react-router-dom";
import "./Nav.css";

interface NavProps {
  className?: string;
}

function Nav({ className = "" }: NavProps) {
  function removeScrollOnBody() {
    const bodyRef = document.querySelector("body") as HTMLBodyElement;
    if (bodyRef.classList.contains("no-scroll")) {
      bodyRef.classList.remove("no-scroll");
    }
  }

  return (
    <nav className={`nav ${className}`}>
      <ul className="nav__ul">
        <li className="nav__li">
          <Link className="nav__link" to={"/"} onClick={removeScrollOnBody}>
            Home
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/about"} onClick={removeScrollOnBody}>
            About
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/contact"} onClick={removeScrollOnBody}>
            Contact
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/menu"} onClick={removeScrollOnBody}>
            Menu
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

// Författare: Adréan
