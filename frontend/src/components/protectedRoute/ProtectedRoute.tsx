import React from "react";
import "./ProtectedRoute.css";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuthStore();
  console.log("ProtectedRoute user:", user);
  console.log("ProtectedRoute isLoading:", isLoading);

  // Vänta tills användarinformation är laddad
  if (isLoading) {
    return (
      <div className="loading-indicator">
        <img
          className="gandalf"
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3d1cmF5MHJmcTkyNmJ4NnFtdXRteXhxM3dwYXZ4eThpbDl0bG13MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8abAbOrQ9rvLG/200.webp"
          alt="You shall not pass"
        />
      </div>
    );
  }

  if (!user) {
    // Oinloggade användare omdirigeras till startsidan
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    if (user.role === "user") {
      return <Navigate to="/menu" replace />; // "user" skickas till meny
    }
    return <Navigate to="/" replace />; // Alla andra skickas till startsidan
  }

  // Rendera innehållet om användaren är inloggad och har rätt roll
  return <>{children}</>;
};

export default ProtectedRoute;

// Författare Adréan
