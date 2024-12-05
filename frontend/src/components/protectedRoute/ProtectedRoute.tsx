import "./ProtectedRoute.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import LazyLoader from "../lazyLoader/LazyLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuthStore();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [showGandalf, setShowGandalf] = useState<boolean>(false);

  // Hantera omdirigering om ingen användare finns
  useEffect(() => {
    if (!user) {
      setShowGandalf(true);
      const timer = setTimeout(() => {
        setShowGandalf(false);
        navigate("/", { replace: true });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Låt Gandalf sköta snacket
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

  if (isLoading || showLoader) {
    return <LazyLoader />;
  }

  if (!user || (requiredRole && user.role !== requiredRole)) {
    navigate(user?.role === "user" ? "/menu" : "/", { replace: true });
    return null;
  }

  // Rendera innehållet om användaren är inloggad och har rätt roll
  return <>{children}</>;
};

export default ProtectedRoute;

// Författare Adréan
