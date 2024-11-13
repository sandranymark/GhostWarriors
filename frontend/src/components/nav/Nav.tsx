import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__ul">
        <li className="nav__li">
          <Link className="nav__link" to={"/"}>
            Home
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/about"}>
            About
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/contact"}>
            Contact
          </Link>
        </li>
        <li className="nav__li">
          <Link className="nav__link" to={"/menu"}>
            Menu
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

// Författare: Adréan
