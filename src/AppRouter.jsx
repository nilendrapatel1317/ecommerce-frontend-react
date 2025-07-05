import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OAuth2Redirect from "./pages/auth/OAuth2Redirect";
import ChangePassword from "./pages/auth/ChangePassword";
import Settings from "./pages/auth/Settings";
import Profile from "./pages/user/Profile";
import Home from "./pages/index";
import TestAPI from "./pages/TestAPI/TestAPI";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/test" element={<TestAPI />} />

    </Routes>
  );
}

export default AppRoutes;
