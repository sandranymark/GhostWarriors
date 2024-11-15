import "./Homepage.css";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

function Homepage() {
  return (
    <section className="homepage-section">
      <Header />
      <Hero />
      <Footer />
    </section>
  );
}

export default Homepage;
