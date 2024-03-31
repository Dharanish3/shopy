import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../AdminPages/Dashboard";
import AllProducts from "../AdminPages/Products/AllProducts";
import AddProducts from "../AdminPages/Products/AddProducts";
import EditProducts from "../AdminPages/Products/EditProducts";
import AllCategories from "../AdminPages/Categories/AllCategories";
import AddCategories from "../AdminPages/Categories/AddCategories";
import EditCategories from "../AdminPages/Categories/EditCategories";
import AllUser from "../AdminPages/Users/AllUser";
import AllOrder from "../AdminPages/Orders/AllOrder";
import Login from "../AdminPages/Components/Login";
import AdminProtectedRoutes from "../ProtectedRoutes/AdminProtectedRoutes";


function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="dashboard"
        element={
          <AdminProtectedRoutes>
            <Dashboard />
          </AdminProtectedRoutes>
        }
      />
      <Route path="login" element={<Login />} />

      {/* Categories Start */}
      <Route
        path="all-categories"
        element={
          <AdminProtectedRoutes>
            <AllCategories />
          </AdminProtectedRoutes>
        }
      />
      <Route path="add-categories" element={<AddCategories />} />
      <Route path="edit-categories/:_id" element={<EditCategories />} />
      {/* Categories End */}

      {/* Products Start */}
      <Route path="all-products" element={<AllProducts />} />
      <Route path="add-products" element={<AddProducts />} />
      <Route path="edit-products/:_id" element={<EditProducts />} />
      {/* Products End */}

      {/* All User */}
      <Route path="user" element={<AllUser />} />
      {/* All User */}

      {/* All Order */}
      <Route path="order" element={<AllOrder />} />
      {/* All Order */}
    </Routes>
  );
}

export default AdminRoutes;
