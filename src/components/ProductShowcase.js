// components/ProductShowcase.js
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from '@mui/icons-material';

const products = [
  {
    name: "Modern Black Chair",
    price: "$129.99",
    rating: 4.5,
    image: "https://via.placeholder.com/300x300?text=Black+Chair"
  },
  {
    name: "Wooden Coffee Table",
    price: "$199.99",
    rating: 4.2,
    image: "https://via.placeholder.com/300x300?text=Coffee+Table"
  },
  {
    name: "Leather Sofa",
    price: "$599.99",
    rating: 4.8,
    image: "https://via.placeholder.com/300x300?text=Leather+Sofa"
  }
];

const ProductShowcase = () => {
  return (
    <div>
      <h2 className="mb-8 text-2xl font-bold text-gray-800">Related Products</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="overflow-hidden bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center justify-center h-64 p-4 bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="object-contain h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                    fontSize="small"
                  />
                ))}
                <span className="ml-1 text-sm text-gray-500">
                  ({product.rating})
                </span>
              </div>
              <p className="text-xl font-bold text-gray-900">{product.price}</p>
              <button className="w-full py-2 mt-4 text-white transition bg-black rounded hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;