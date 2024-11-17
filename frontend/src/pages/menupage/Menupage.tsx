import "./Menupage.css";
import cake from "../../assets/cake.svg";
import baguette from "../../assets/baguette.svg";
import sandwich from "../../assets/sandwich.svg";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import ricePorridge from "../../assets/ricePorridge.svg";
import avocadoToast from "../../assets/avocadoToast.svg";
import MenuItem from "../../components/menuItem/MenuItem";
import breakfastPlate from "../../assets/breakfastPlate.svg";

function Menupage() {
  return (
    <section className="menupage-section">
      <Header />
      <menu className="menu">
        <MenuItem
          image={ricePorridge}
          heading="Rice porridge"
          description="A warm and creamy porridge made from rice, perfect for a comforting breakfast."
        />
        <MenuItem
          image={cake}
          heading="Delicious cake"
          description="A sweet and moist cake, topped with a delightful glaze or cream."
        />
        <MenuItem
          image={baguette}
          heading="Baguette"
          description="A classic French baguette, crispy on the outside and soft on the inside."
        />
        <MenuItem
          image={sandwich}
          heading="Sandwich"
          description="A delicious sandwich filled with fresh ingredients and flavorful spreads."
        />
        <MenuItem
          image={avocadoToast}
          heading="Avocado toast"
          description="Crispy toast topped with creamy avocado and a hint of lime."
        />
        <MenuItem
          image={breakfastPlate}
          heading="Breakfast plate"
          description="A hearty breakfast plate featuring a variety of classic morning favorites."
        />
      </menu>
      <Footer />
    </section>
  );
}

export default Menupage;

// Författare Adréan
