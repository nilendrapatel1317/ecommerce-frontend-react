import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/UserService';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async () => {
    // Frontend validation
    if (!form.username || !form.email || !form.password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }
    if (form.password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      const res = await registerUser(form);
      console.log(res);
      toast.success(res.data?.message || "Registration successful");
      navigate("/login");
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message || "Registration failed";
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
          <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
          <input 
            className="px-3 py-2 mb-4 w-full rounded border" 
            placeholder="Username" 
            onChange={(e) => setForm({ ...form, username: e.target.value })} 
            required
          />
          <input 
            className="px-3 py-2 mb-4 w-full rounded border" 
            placeholder="Email" 
            onChange={(e) => setForm({ ...form, email: e.target.value })} 
            required
          />
          <input 
            className="px-3 py-2 mb-4 w-full rounded border" 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setForm({ ...form, password: e.target.value })} 
            required
          />
          <input 
            className="px-3 py-2 mb-4 w-full rounded border" 
            type="password" 
            placeholder="Confirm Password" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
          <select 
            className="px-3 py-2 mb-6 w-full bg-gray-100 rounded border" 
            value="CUSTOMER"
            disabled
          >
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
          <button 
            className="py-2 w-full font-semibold text-white bg-blue-600 rounded transition hover:bg-blue-700" 
            onClick={handleRegister}
          >
            Register
          </button>
          <br />
          <br />
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login here
            </button>
          </p>
        </motion.div>
      </div>
    </>
  );
} 