// components/ProductHeader.js
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';

const ProductHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h1 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">
        Buy Modern Chair in Black Color
      </h1>
      <p className="mb-6 text-sm text-gray-500 uppercase">BUSINESS OFFICE</p>
      
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant="contained"
          sx={{
            bgcolor: 'black',
            '&:hover': { bgcolor: 'gray.800' },
            textTransform: 'none',
            padding: '8px 24px'
          }}
        >
          Add to Cart
        </Button>
        
        <Button
          variant="outlined"
          sx={{
            borderColor: 'black',
            color: 'black',
            '&:hover': { borderColor: 'gray.800' },
            textTransform: 'none',
            padding: '8px 24px'
          }}
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductHeader;