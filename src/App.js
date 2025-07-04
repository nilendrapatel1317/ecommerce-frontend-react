// App.js
import React from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import HomeSlider from './components/HomeSlider';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container px-4 py-6 mx-auto">
        {/* <HeroBanner /> */}
        <HomeSlider />
        <Categories />
        <FeaturedProducts />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;