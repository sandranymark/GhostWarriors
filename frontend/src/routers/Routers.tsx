import Cart from "../components/cart/Cart";
import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/homepage/Homepage";
import Menupage from "../pages/menupage/Menupage";
import Aboutpage from "../pages/aboutpage/Aboutpage";
import StaffPage from "../pages/staffpage/StaffPage";
import Contactpage from "../pages/contactpage/Contactpage";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

function Routers() {
  return (
    <>
      <Cart />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menupage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contactpage />} />
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
  );
}

export default Routers;
// Författare Adréan Anton Sandra
