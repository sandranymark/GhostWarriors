import "./MenuItem.css";
import IncrementButton from "../incrementButton/IncrementButton";

interface MenuItemProps {
  id: string;
  image: string;
  heading: string;
  price: number;
  description: string;
  quantity?: number;
}

function MenuItem({ id, image, heading, price, description }: MenuItemProps) {
  return (
    <article className="menuItem__article">
      <figure className="menuItem__figure">
        <img className="menuItem__image" src={image} alt={heading} />
      </figure>
      <h2 className="menuItem__heading">{heading}</h2>
      <p className="menuItem__price">{price} SEK</p>
      <p className="menuItem__description">{description}</p>
      <IncrementButton id={id} heading={heading} price={price} image={image} />
    </article>
  );
}

export default MenuItem;

// Författare Adréan
//Modifierad: Anton - Import av komponent
