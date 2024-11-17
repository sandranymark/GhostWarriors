import "./MenuItem.css";

interface MenuItemProps {
  image: string;
  heading: string;
  description: string;
}

function MenuItem({ image, heading, description }: MenuItemProps) {
  return (
    <article>
      <img className="menuItem-image" src={image} alt="avocado toast" />
      <h2 className="menuItem-heading">{heading}</h2>
      <p className="menuItem-description">{description}</p>
    </article>
  );
}

export default MenuItem;

// Författare Adréan
