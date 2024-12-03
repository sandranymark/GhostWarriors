import React from "react";
import { Navigate } from "react-router-dom";
import { useLogin } from "./../../context/LoginContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string; // T.ex. "admin" eller "user"
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user } = useLogin();
  console.log("ProtectedRoute user:", user);

  if (user === null) {
    console.log("ProtectedRoute: No user found, redirecting...");
    return <p>LOADING</p>; // HÄR SKA EN LAZY LOADER IN!!!!!!!!!!
  }

  if (!user) {
    console.log("User not logged in, redirecting to /");
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log(
      `User role ${user.role} does not match required role ${requiredRole}, redirecting to /menu`
    );
    return <Navigate to="/menu" replace />;
  }

  // Om användaren är inloggad och har rätt roll, rendera barnkomponenterna
  return <>{children}</>;
};

export default ProtectedRoute;
