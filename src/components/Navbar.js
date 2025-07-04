// components/Navbar.js
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Person, ShoppingCart } from '@mui/icons-material';

const Navbar = () => {
  return (
    <nav className="py-4 bg-white shadow-md">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto md:flex-row">
        {/* Logo and Search */}
        <div className="flex items-center w-full mb-4 md:w-auto md:mb-0">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:items-start"
          >
            <h1 className="text-2xl font-bold text-gray-800">CLASSYSHOP</h1>
            <p className="text-xs text-gray-500">BIG MEGA STORE</p>
          </motion.div>
          
          <div className="relative flex-grow ml-4 md:ml-8 md:flex-grow-0 md:w-64">
            <input 
              type="text" 
              placeholder="Search products here..." 
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <Person className="mr-1" />
            <span>Login / Register</span>
          </button>
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <ShoppingCart className="mr-1" />
          </button>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;