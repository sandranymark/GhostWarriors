import Homepage from "../pages/homepage/Homepage";
import Menupage from "../pages/menupage/Menupage";
import Aboutpage from "../pages/aboutpage/Aboutpage";
import Contactpage from "../pages/contactpage/Contactpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Routers() {
  return (
    <BrowserRouter>
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
