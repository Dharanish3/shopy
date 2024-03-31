import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UserRoutes({ children }) {
  let role = sessionStorage.getItem("role");
  return role === "User" ? children : <Navigate to="/login" />;
}

export default UserRoutes;
