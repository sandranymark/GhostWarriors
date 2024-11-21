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
    <article className="menuItem__article">
      <figure className="menuItem__figure">
        <img className="menuItem__image" src={image} alt="avocado toast" />
      </figure>
      <h2 className="menuItem__heading">{heading}</h2>
      <p className="menuItem__price">{price} SEK</p>
      <p className="menuItem__description">{description}</p>
      <IncrementButton />
    </article>
  );
}

export default MenuItem;

// Författare Adréan
//Modifierad: Anton - Import av komponent
