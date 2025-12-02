import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token");

  // Validamos que haya token y que parezca válido (más de 50 caracteres)
  if (!token || token.length < 50) {
    // Redirige al login si no hay token válido
    return <Navigate to="/login" replace />;
  }

  // Si hay token, permite mostrar el contenido protegido
  return children;
};

export default ProtectedRoute;