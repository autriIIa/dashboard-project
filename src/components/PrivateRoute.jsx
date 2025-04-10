// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
