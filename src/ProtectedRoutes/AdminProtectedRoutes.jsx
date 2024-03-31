import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoutes({ children }) {
  let role = sessionStorage.getItem("role");
  return role === "Admin" ? children : <Navigate to="/admin/login" />;
}

export default AdminProtectedRoutes;
