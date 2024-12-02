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
    console.log("ProtectedRoute: Waiting for user to load...");
    return <p>Loading...</p>; // Visar laddningsindikator tills användardata finns
  }
  if (!user) {
    console.log("User not logged in, redirecting to /");
    // Om inte inloggad, omdirigera till login-sidan
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log(
      `User role ${user.role} does not match required role ${requiredRole}, redirecting to /menu`
    );

    // Om användaren inte har rätt roll, omdirigera till en annan sida (t.ex. startsidan)
    return <Navigate to="/menu" />;
  }

  // Om användaren är inloggad och har rätt roll, rendera barnkomponenterna
  return <>{children}</>;
};

export default ProtectedRoute;
