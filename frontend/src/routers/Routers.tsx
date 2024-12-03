import Cart from "../components/cart/Cart";
import Homepage from "../pages/homepage/Homepage";
import Menupage from "../pages/menupage/Menupage";
import Aboutpage from "../pages/aboutpage/Aboutpage";
import Contactpage from "../pages/contactpage/Contactpage";
import { Route, Routes } from "react-router-dom";
import StaffPage from "../pages/staffpage/StaffPage";
import StaffMenuPage from "../pages/staffmenupage/StaffMenuPage";
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
        <Route
          path="/staff/menu"
          element={
            <ProtectedRoute requiredRole="admin">
              <StaffMenuPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Routers;
// Författare Adréan Anton Sandra
