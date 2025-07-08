import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OAuth2Redirect from "./pages/auth/OAuth2Redirect";
import ChangePassword from "./pages/auth/ChangePassword";
import Profile from "./pages/user/Profile";
import ProductList from "./components/product/ProductList";
import Home from "./pages/index";
import TestAPI from "./pages/TestAPI/TestAPI";
import AuthTest from "./components/common/AuthTest";
import CartItem from "./components/product/CartItem";
import SettingPage from "./pages/auth/SettingPage";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/test" element={<TestAPI />} />
      <Route path="/auth-test" element={<AuthTest />} />
      <Route path="/my/cart" element={<CartItem />} />


    </Routes>
  );
}

export default AppRoutes;
