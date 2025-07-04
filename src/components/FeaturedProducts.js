// components/FeaturedProducts.js
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

const FeaturedProducts = () => {
  const featuredItems = [
    {
      title: "Samsung Gear VR Camera",
      price: "$129.00",
      image: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-1.jpg",
      bgColor: "bg-blue-50"
    },
    {
      title: "Women Solid Round Green T-Shirt",
      price: "Starting At Only $59.00",
      tag: "Big Saving Days Sale",
      image: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-2.jpg",
      bgColor: "bg-green-50"
    },
    {
      title: "Marcel Dining Room Chair",
      price: "$129.00",
      image: "https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/cms-banner-3.jpg",
      bgColor: "bg-yellow-50"
    }
  ];

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-xl font-semibold text-gray-800">FEATURED PRODUCTS</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {featuredItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className={`${item.bgColor} rounded-xl overflow-hidden shadow-md`}
          >
            <div className="p-6">
              {item.tag && (
                <span className="inline-block px-2 py-1 mb-2 text-xs text-white bg-red-500 rounded">
                  {item.tag}
                </span>
              )}
              <h4 className="mb-2 text-lg font-semibold">{item.title}</h4>
              <p className="mb-4 text-gray-600">{item.price}</p>
              <Button 
                variant="contained" 
                size="small"
                sx={{
                  bgcolor: 'black',
                  '&:hover': {
                    bgcolor: 'gray.700',
                  }
                }}
              >
                SHOP NOW
              </Button>
            </div>
            <div className="flex justify-center items-center h-48 bg-white">
              <img 
                src={item.image} 
                alt={item.title} 
                className="object-contain h-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;