import "./Hero.css";
import breakfastBg from "../../assets/breakfastBg.svg";

function Hero() {
  return (
    <figure className="hero-section">
      <img
        className="hero__background-image"
        src={breakfastBg}
        alt="Background image with beverage"
      />
      <figcaption className="hero__figcaption">
        <h1 className="hero__heading">
          The <span className="hero__heading--white">best</span> damn breakfast in town!
        </h1>
        <h2 className="hero_slogan">Fresh, fast and ready to go!</h2>
        <button className="hero-button">Order now</button>
      </figcaption>
    </figure>
  );
}

export default Hero;

// Författare: Adréan
