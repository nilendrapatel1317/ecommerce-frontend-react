import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileSidebar from "../components/product/ProfileSidebar";

const routeMap = {
  "/profile": "profile",
  "/address": "address",
  "/wishlist": "wishlist",
  "/orders": "orders",
  "/settings": "settings"
};

const keyToRoute = {
  profile: "/profile",
  address: "/address",
  wishlist: "/wishlist",
  orders: "/orders",
  settings: "/settings"
};

const ProfileLayout = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("profile");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    // Set selected tab based on current route
    const key = routeMap[location.pathname] || "profile";
    setSelected(key);
  }, [location.pathname]);

  const handleSelect = (key) => {
    if (key === "logout") {
      localStorage.removeItem("user");
      window.location.reload();
      return;
    }
    setSelected(key);
    navigate(keyToRoute[key] || "/profile");
  };

  return (
    <Box sx={{ bgcolor: '#f7f3f3', minHeight: '100vh', py: 1 }}>
      <Grid container justifyContent="center" spacing={2} sx={{ mt: 0, px: 3 }}>
        <Grid item xs={12} md={3} sx={{ position: { md: 'sticky' }, top: 32, alignSelf: 'flex-start' }}>
          <ProfileSidebar user={user} selected={selected} onSelect={handleSelect} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box sx={{ borderRadius: 3, boxShadow: 2, bgcolor: '#fff', minHeight: 400 }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileLayout; 