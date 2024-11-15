import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./Contactpage.css";

function Contactpage() {
  return (
    <section className="contactpage-section">
      <Header />
      <Contact />
      <Footer />
    </section>
  );
}

export default Contactpage;
