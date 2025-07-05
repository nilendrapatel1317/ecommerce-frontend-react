import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loginUser, fetchUserProfile } from '../../services/UserService';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.data.token);
      
      // Fetch and store user profile
      try {
        const profile = await fetchUserProfile();
        localStorage.setItem("user", JSON.stringify(profile?.data?.data));
      } catch (profileError) {
        console.error("Failed to fetch user profile:", profileError);
        // Still proceed with login even if profile fetch fails
      }
      
      // Dispatch custom event to notify navbar
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="container p-8 mx-auto mt-8 max-w-md bg-white rounded shadow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
          <input
            className="px-3 py-2 mb-4 w-full rounded border"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="px-3 py-2 mb-6 w-full rounded border"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="py-2 w-full font-semibold text-white bg-blue-600 rounded transition hover:bg-blue-700"
            onClick={handleLogin}
          >
            Login
          </button>
          <br />
          <br />
          <a
            href="http://localhost:8080/oauth2/authorization/google"
            className="block py-2 mt-4 w-full font-semibold text-center text-white bg-red-500 rounded transition hover:bg-red-600"
          >
            Login with Google
          </a>
          <br />
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register Now
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
}
