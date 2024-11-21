
import './IncrementButton.css';
import { useState } from 'react';
import useCartStore from '../../stores/cartStore';

interface IncrementButtonProps {
  id: string;
  heading: string;
  price: number;
  image: string; 
}

function IncrementButton({ id, heading, price, image }: IncrementButtonProps) {
  const [value, setValue] = useState(0);
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const increaseValue = () => {
    setValue(value + 1);
    addToCart({ id, heading, price, image });
    console.log('Added to cart:', { id, heading, price });
  };

  const decreaseValue = () => {
    if (value > 0) {
      setValue(value - 1);
      decreaseQuantity(id);
      console.log('decrease quantity for product:', id);
    }
  };

  return (
    <div className='increment-section'>
      <div className="menuItem-addToCart--btn">
        <button className="decreace cart-btn" onClick={decreaseValue}>-</button>
        <div className="display-value">{value}</div>
        <button className="increase cart-btn" onClick={increaseValue}>+</button>
      </div>
      <button className="menuItem-addTocart">add to cart</button>
    </div>
  );
}

export default IncrementButton;

// Författare: Anton