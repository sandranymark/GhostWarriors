import "./Hero.css";
import breakfastBg from "../../assets/breakfastBg.svg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <figure className="hero__section">
      <img
        className="hero__background-image"
        src={breakfastBg}
        alt="Background image with beverage"
      />
      <figcaption className="hero__figcaption">
        <h1 className="hero__heading">
          The <span className="hero__heading--white">best</span> damn breakfast in town!
        </h1>
        <p className="hero_slogan">Fresh, fast and ready to go!</p>
        <Link to={"/menu"} className="hero-link">
          Order now
        </Link>
      </figcaption>
    </figure>
  );
}

export default Hero;

// Författare: Adréan
