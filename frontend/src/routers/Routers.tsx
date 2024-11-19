import Homepage from "../pages/homepage/Homepage";
import Menupage from "../pages/menupage/Menupage";
import Aboutpage from "../pages/aboutpage/Aboutpage";
import Contactpage from "../pages/contactpage/Contactpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "../components/cart/Cart";
import { useCart } from "../context/CartContext";

function Routers() {
  const { isCartVisible, toggleCartVisibility } = useCart();

  return (
    <BrowserRouter>
    <Cart isVisible={isCartVisible} onClose={toggleCartVisibility} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menupage />} />
        {/* <Route path="/cart" element={ <Cartpage /> } /> */}
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contactpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
