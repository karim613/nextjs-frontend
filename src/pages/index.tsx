// src/pages/index.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Brands from '../components/Brands';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import Lowerfooter from '../components/Lowerfooter';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div id="next-section">
        <Features />
        <Brands /> {/* Updated to include the Brands component */}
        <Categories />
      </div>
      <Footer />
      <Lowerfooter />
    </div>
  );
};

export default Home;
