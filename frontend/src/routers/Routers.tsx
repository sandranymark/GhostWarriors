import Cart from "../components/cart/Cart";
import Homepage from "../pages/homepage/Homepage";
import Menupage from "../pages/menupage/Menupage";
import Aboutpage from "../pages/aboutpage/Aboutpage";
import Contactpage from "../pages/contactpage/Contactpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffPage from "../pages/staffpage/StaffPage";
import StaffMenuPage from "../pages/staffmenupage/StaffMenuPage";

function Routers() {
  return (
  <BrowserRouter>
      <Cart />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/staff/orders" element={<StaffPage />} />
        <Route path="/staff/menu" element={<StaffMenuPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
// Författare Adréan Anton Sandra

