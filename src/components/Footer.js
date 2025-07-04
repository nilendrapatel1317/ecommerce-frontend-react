// components/Footer.js
import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="py-8 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="mb-4 text-xl font-bold">CLASSYSHOP</h4>
            <p className="mb-4 text-gray-400">
              Your one-stop shop for all the latest fashion and lifestyle products.
            </p>
            <div className="flex space-x-4">
              <Facebook className="cursor-pointer hover:text-blue-400" />
              <Twitter className="cursor-pointer hover:text-blue-400" />
              <Instagram className="cursor-pointer hover:text-pink-400" />
              <LinkedIn className="cursor-pointer hover:text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h5 className="mb-4 font-semibold">Shop</h5>
            <ul className="space-y-2">
              {['All Products', 'New Arrivals', 'Featured', 'Discounts'].map((item) => (
                <li key={item} className="text-gray-400 cursor-pointer hover:text-white">{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h5 className="mb-4 font-semibold">Customer Service</h5>
            <ul className="space-y-2">
              {['Contact Us', 'FAQs', 'Shipping', 'Returns'].map((item) => (
                <li key={item} className="text-gray-400 cursor-pointer hover:text-white">{item}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h5 className="mb-4 font-semibold">Newsletter</h5>
            <p className="mb-4 text-gray-400">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-2 text-gray-800 rounded-l focus:outline-none"
              />
              <button className="px-4 py-2 bg-blue-500 rounded-r hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        <div className="pt-6 mt-8 text-center text-gray-400 border-t border-gray-700">
          <p>© {new Date().getFullYear()} CLASSYSHOP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;