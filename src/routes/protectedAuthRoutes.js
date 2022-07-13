import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");
  if (user || admin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
