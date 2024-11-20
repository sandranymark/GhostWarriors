import './IncrementButton.css'
import { useState } from 'react'

function IncrementButton() {

    const [value, setValue] = useState(0);

    const increaseValue = () => {
      setValue(value + 1);
    };
  
    const decreaseValue = () => {
      if(value > 0) {
        setValue(value - 1);
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
  )
}

export default IncrementButton;

// Författare: Anton