import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "../UserPages/About";
import Home from "../UserPages/Home";
import Cart from "../UserPages/Cart";
import Error404 from "../Components/Error404";
import Login from "../Components/Login";
import SignIn from "../Components/SignIn";
import Products from "../UserPages/Products";
import ProductDetails from "../UserPages/ProductDetails";
import Contact from "../UserPages/Contact";
import Checkout from "../UserPages/Checkout";
import Ordered from "../UserPages/Ordered";
import UserProfile from "../Components/UserProfile";
import UserRoutes from "../ProtectedRoutes/UserRoutes";
import UserContext from "../Context/UserContext";
import YourOrder from "../Components/YourOrder";

function WebRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<Contact />} />
      <Route path="shops" element={<Products />} />
      <Route path="shops/:_id" element={<ProductDetails />} />
      <Route
        path="checkout"
        element={
          <UserRoutes>
            <Checkout />
          </UserRoutes>
        }
      />
      <Route
        path="checkout-success"
        element={
          
            <UserContext>
              <Ordered />
            </UserContext>
        
        }
      />
      <Route path="/*" element={<Error404 />} />

      {/* Login and Signin */}
      <Route path="login" element={<Login />} />
      <Route path="sign-up" element={<SignIn />} />
      <Route
        path="your-order"
        element={
          <UserContext>
            <YourOrder />
          </UserContext>
        }
      />
      <Route
        path="profile"
        element={
          <UserRoutes>
            <UserContext>
              <UserProfile />
            </UserContext>
          </UserRoutes>
        }
      />
    </Routes>
  );
}

export default WebRoutes;
