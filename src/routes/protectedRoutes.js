import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  const admin = localStorage.getItem("admin");
  if (
    (user === undefined || user === null) &&
    (admin === undefined || admin === null)
  ) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
