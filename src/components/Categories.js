// components/Categories.js
import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Star, LocalOffer, MenuBook } from '@mui/icons-material';

const Categories = () => {
  const categories = [
    { name: 'Home', icon: <Home /> },
    { name: 'Fashion', icon: <ShoppingBag /> },
    { name: 'New Arrivals', icon: <Star /> },
    { name: 'All Brands', icon: <MenuBook /> },
    { name: 'Best Deals', icon: <LocalOffer /> },
    { name: 'Blog', icon: <MenuBook /> },
  ];

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">SHOP BY CATEGORIES</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm transition-shadow cursor-pointer hover:shadow-md"
          >
            <div className="mb-2 text-blue-500">{category.icon}</div>
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;