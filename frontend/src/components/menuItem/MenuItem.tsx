import IncrementButton from "../incrementButton/IncrementButton";
import "./MenuItem.css";

interface MenuItemProps {
  image: string;
  heading: string;
  price: number;
  description: string;
}

function MenuItem({ image, heading, price, description }: MenuItemProps) {

  return (
    <article>
      <img className="menuItem-image" src={image} alt="avocado toast" />
      <h2 className="menuItem-heading">{heading}</h2>
      <p className="menuItem-price">{price} SEK</p>
      <p className="menuItem-description">{description}</p>
      < IncrementButton />
    </article>
  );
}

export default MenuItem;

// Författare Adréan
//Modifierad: Anton - Import av komponent
