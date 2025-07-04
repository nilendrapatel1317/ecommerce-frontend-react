// components/ProductGrid.js
import React from 'react';
import { motion } from 'framer-motion';

const ProductGrid = () => {
  const products = [
    { name: "Smart Tablet", image: "/dummy-image.png" },
    { name: "Crepe T-Shirt", image: "/dummy-image.png" },
    { name: "Leather Watch", image: "/dummy-image.png" },
    { name: "Rolling Diamond", image: "/dummy-image.png" },
    { name: "Wooden Chair", image: "/dummy-image.png" },
    { name: "Sneakers Shoes", image: "/dummy-image.png" },
    { name: "Purse", image: "/dummy-image.png" },
  ];

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">POPULAR PRODUCTS</h3>
        <span className="text-sm text-blue-500">Free International Delivery</span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="p-3 bg-white rounded-lg shadow-sm transition-shadow cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-center items-center mb-2 h-32">
              <img 
                src={"/dummy-image.png"} 
                alt={product.name} 
                className="object-contain h-full"
              />
            </div>
            <p className="text-sm font-medium text-center text-gray-700">{product.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;