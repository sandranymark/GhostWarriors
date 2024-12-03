import Cart from "../components/cart/Cart";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Menupage from "../pages/menupage/Menupage";
import Aboutpage from "../pages/aboutpage/Aboutpage";
import Contactpage from "../pages/contactpage/Contactpage";
<<<<<<< HEAD
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StaffPage from "../pages/staffpage/StaffPage";
import StaffMenuPage from "../pages/staffmenupage/StaffMenuPage";
>>>>>>> 5db719f70ec579cbf4fa96b2f84c55748fbbe137

function Routers() {
  return (
    <>
      <Cart />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contactpage />} />
<<<<<<< HEAD
        <Route
          path="/staff"
          element={
            <ProtectedRoute requiredRole="admin">
              <StaffPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
=======
        <Route path="/staff/orders" element={<StaffPage />} />
        <Route path="/staff/menu" element={<StaffMenuPage />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 5db719f70ec579cbf4fa96b2f84c55748fbbe137
  );
}

export default Routers;
// Författare Adréan Anton Sandra
