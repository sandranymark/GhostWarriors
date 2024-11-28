import Cart from "../components/cart/Cart";
import Homepage from "../pages/homepage/Homepage";
import Menupage from "../pages/menupage/Menupage";
import Aboutpage from "../pages/aboutpage/Aboutpage";
import StaffPage from "../pages/staffpage/StaffPage";
import Contactpage from "../pages/contactpage/Contactpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Routers() {
  return (
    <BrowserRouter>
      <Cart />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/staff" element={<StaffPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;

// Författare Adréan Anton Sandra
