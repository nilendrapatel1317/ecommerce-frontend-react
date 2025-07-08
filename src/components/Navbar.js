// components/Navbar.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Person,
  ShoppingCart,
  Logout,
  HeartBroken,
  MonitorHeart,
  Favorite,
  South,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IconButton, Badge, Tooltip } from "@mui/material";
import AccountMenu from "./material UI components/AccountMenu";
import { fetchUserProfile } from "../services/UserService";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user profile and update localStorage
  const syncUserProfile = async () => {
    try {
      const res = await fetchUserProfile();
      if (res.data) {
        setUser(res?.data?.data);
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        setIsLoggedIn(true);
      }
    } catch (e) {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    syncUserProfile();
    // Listen for cart changes or loginStatusChanged
    const handler = () => syncUserProfile();
    window.addEventListener("loginStatusChanged", handler);
    return () => window.removeEventListener("loginStatusChanged", handler);
  }, []);

  const handleLogout = () => {
    // Clear all data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken"); // Also clear this if it exists

    // Show logout toast
    toast.success("Logged out successfully!");

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("loginStatusChanged"));

    // Redirect to home page
    navigate("/");
  };

  return (
    <nav className="py-4 bg-white shadow-md">
      <div className="container flex flex-col justify-between items-center px-4 mx-auto md:flex-row">
        {/* Logo and Search */}
        <div className="flex items-center mb-4 w-full md:w-auto md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start"
          >
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 uppercase transition-colors hover:text-blue-600"
            >
              Ecommerce
            </Link>
            <p className="text-xs text-gray-500">BIG MEGA STORE</p>
          </motion.div>

          <div className="relative flex-grow ml-4 md:ml-8 md:flex-grow-0 md:w-64">
            <input
              type="text"
              placeholder="Search products here..."
              className="px-4 py-2 pr-10 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute top-2.5 right-3 text-gray-400" />
          </div>
        </div>

        {/* Auth Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          {isLoggedIn ? (
            // User is logged in - show profile and logout
            <>
              <AccountMenu user={user} />
            </>
          ) : (
            // User is not logged in - show login and register
            <>
              <Link
                to="/login"
                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
              >
                <Person className="mr-1" />
                <span>Login</span>
              </Link>
              {/* <Link
                to="/register"
                className="flex items-center text-gray-700 transition-colors hover:text-blue-600"
              >
                <span>Register</span>
              </Link> */}
            </>
          )}

          {/* Shopping Cart - always visible */}
          <div className="flex">
            <Tooltip title="Wishlist Items">
              <IconButton aria-label="cart">
                <Badge
                  badgeContent={user?.wishlist?.length || 0}
                  color="primary"
                  showZero
                >
                  <Favorite className="text-red-500" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Link to="/my/cart" className="flex items-center">
              <Tooltip title="Cart Items">
                <IconButton aria-label="cart">
                  <Badge
                    badgeContent={user?.cartItems?.length || 0}
                    color="primary"
                    showZero
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
