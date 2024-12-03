import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuthStore();

  console.log("ProtectedRoute user:", user);
  console.log("ProtectedRoute loading:", isLoading);

  // Vänta tills användarinformation är laddad
  if (isLoading) {
    return (
      <div className="loading-indicator">
        <p style={{ color: "#FFFFFF" }}>Loading...</p>
      </div>
    );
  }

  // Kontrollera om användaren inte är inloggad
  if (!user) {
    console.log("User not logged in, redirecting to /");
    return <Navigate to="/" replace />;
  }

  // Kontrollera användarens roll
  if (requiredRole && user.role !== requiredRole) {
    console.log(
      `User role ${user.role} does not match required role ${requiredRole}, redirecting to /menu`
    );
    return <Navigate to="/menu" replace />;
  }

  // Rendera innehållet om användaren är inloggad och har rätt roll
  return <>{children}</>;
};

export default ProtectedRoute;
