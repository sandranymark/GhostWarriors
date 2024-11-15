import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./Aboutpage.css";

function Aboutpage() {
  return (
    <section className="aboutpage-section">
      <Header />
      <About />
      <Footer />
    </section>
  );
}

export default Aboutpage;
