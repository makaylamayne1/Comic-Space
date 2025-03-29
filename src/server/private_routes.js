import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Check if token exists in localStorage or your authentication state
  const token = localStorage.getItem("token");

  // If token exists and is valid, user is authenticated
  const isAuthenticated = token && token.length > 0;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
