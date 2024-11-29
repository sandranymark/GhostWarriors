import "./About.css";
import brunchBg from "../../assets/brunchBg.svg";

function About() {
  return (
    <section className="about-section">
      <img className="about__bg-image" src={brunchBg} alt="breakfast image" />
      <article className="about__textbox">
        <h1 className="about__textbox-heading">
          Our Story and <span className="about__textbox-heading--orange">Passion</span> for
          Breakfast
        </h1>
        <p className="about__textbox-text">
          Welcome to Dilivery for Breakfast! We are a newly established breakfast restaurant
          dedicated to creating the perfect start to your day.
          <br />
          <br />
          Our journey began with a simple idea: to bring together the best morning flavors in a
          delightful atmosphere where everyone feels welcome. As founders, we share a passion for
          breakfast that not only satisfies hunger but also offers a moment of calm, connection, and
          enjoyment.
          <br />
          <br />
          We believe in the value of local ingredients and sustainability. That’s why we partner
          with carefully selected suppliers who share our vision of natural and eco-friendly
          products. Everything, from freshly baked bread and ripe berries to our homemade granola,
          is thoughtfully crafted to provide you with a taste experience that is both delicious and
          kind to our planet.
        </p>
      </article>
    </section>
  );
}

export default About;

// Författare: Adréan
