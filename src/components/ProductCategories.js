// components/ProductCategories.js
import React from 'react';
import { motion } from 'framer-motion';

const ProductCategories = () => {
  const categories = [
    { title: "WATCH", items: [
      "Susan Lucky Three Seater Sale",
      "Western In Red Corner Nick's Fails"
    ]},
    { title: "Present Place", items: [
      "Herald Pitch",
      "Black Shone Sweet Woods T-S2",
      "Dave and the Dee-Layne Camp Light",
      "Gerald",
      "MARSHALL",
      "LANDSA",
      "JOHN BURST"
    ]},
    { title: "About the Year", items: [
      "Fellow to Dr Instagram"
    ]}
  ];

  return (
    <div className="mb-16">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="pb-2 mb-4 text-xl font-semibold text-gray-800 border-b">
            {category.title}
          </h2>
          <ul className="space-y-2">
            {category.items.map((item, itemIndex) => (
              <motion.li
                key={item}
                whileHover={{ x: 5 }}
                className="text-gray-600 cursor-pointer hover:text-gray-900"
              >
                - {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductCategories;