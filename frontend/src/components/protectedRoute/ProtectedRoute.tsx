// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/LoginContext";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/" />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;