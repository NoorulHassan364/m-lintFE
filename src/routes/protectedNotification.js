import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedNotification({ children }) {
  const admin = localStorage.getItem("admin");
  if (admin === undefined || admin === null) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedNotification;
