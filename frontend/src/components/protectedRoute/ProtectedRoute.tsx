import React, { useEffect, useState } from "react";
import "./ProtectedRoute.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import LazyLoader from "../lazyLoader/LazyLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore();
  const [showLoader, setShowLoader] = useState<boolean>(true); // Styr LazyLoader
  const [showGandalf, setShowGandalf] = useState<boolean>(false); // Styr Gandalf

  // Hantera omdirigering om ingen användare finns
  useEffect(() => {
    if (!user) {
      setShowGandalf(true); // Visa Gandalf först
      const timer = setTimeout(() => {
        setShowGandalf(false); // Stäng av Gandalf
        navigate("/", { replace: true }); // Navigera till startsidan efter 4 sekunder
      }, 4000);

      return () => clearTimeout(timer); // Rensa timeout om komponenten unmountas
    }
  }, [user, navigate]);

  // Hantera LazyLoader efter 2 sekunder
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // Stäng av LazyLoader
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Visa Gandalf om användaren inte finns
  if (showGandalf) {
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

  // Visa LazyLoader om datan fortfarande laddas
  if (isLoading || showLoader) {
    return <LazyLoader />;
  }

  // Hantera omdirigering baserat på användarroll
  if (!user || (requiredRole && user.role !== requiredRole)) {
    if (user?.role === "user") {
      navigate("/menu", { replace: true }); // Omdirigera användare med rollen "user" till meny
    } else {
      navigate("/", { replace: true }); // Omdirigera alla andra till startsidan
    }
    return null; // Returnera null för att undvika ytterligare rendering
  }

  // Rendera innehållet om användaren är inloggad och har rätt roll
  return <>{children}</>;
};

export default ProtectedRoute;
