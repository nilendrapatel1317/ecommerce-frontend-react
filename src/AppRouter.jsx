import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChangePassword from "./pages/auth/ChangePassword";
import OAuth2Redirect from "./pages/auth/OAuth2Redirect";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfileDetails from "./components/product/ProfileDetails";
import AddressList from "./components/product/AddressList";
import WishList from "./components/product/WishList";
import MyOrders from "./components/product/MyOrders";
import SettingPage from "./pages/auth/SettingPage";
import ProductList from "./components/product/ProductList";
import TestAPI from "./pages/TestAPI/TestAPI";
import AuthTest from "./components/common/AuthTest";
import CartItem from "./components/product/CartItem";

const AppRouter = ({ user }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
    {/* Profile section with sidebar layout */}
    <Route path="/" element={<ProfileLayout />}>
      <Route path="profile" element={<ProfileDetails user={user} />} />
      <Route path="address" element={<AddressList user={user} />} />
      <Route path="wishlist" element={<WishList user={user} />} />
      <Route path="orders" element={<MyOrders user={user} />} />
      <Route path="settings" element={<SettingPage user={user} />} />
    </Route>
    <Route path="/products" element={<ProductList />} />
    <Route path="/test" element={<TestAPI />} />
    <Route path="/auth-test" element={<AuthTest />} />
    <Route path="/cart" element={<CartItem />} />
  </Routes>
);

export default AppRouter;
