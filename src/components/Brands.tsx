// src/components/Brands.tsx

import React, { useState, useEffect } from 'react';
import styles from '../styles/Brands.module.css';
import Image from "next/image";

type Brand = {
  name: string;
  imageUrl: string;
  websiteUrl: string;
};

const brands: Brand[] = [
  { name: 'Sephora', imageUrl: '/images/sephora.jpg', websiteUrl: 'https://www.sephora.com' },
  { name: 'BackMarket', imageUrl: '/images/backmarket.jpg', websiteUrl: 'https://www.backmarket.com' },
  { name: 'Airbnb', imageUrl: '/images/airbnb.jpg', websiteUrl: 'https://www.airbnb.com' },
  { name: 'Nike', imageUrl: '/images/nike.jpg', websiteUrl: 'https://www.nike.com' },
  { name: 'Apple', imageUrl: '/images/apple.jpg', websiteUrl: 'https://www.apple.com' },
  { name: 'Adidas', imageUrl: '/images/adidas.jpg', websiteUrl: 'https://www.adidas.com' },
  { name: 'Zara', imageUrl: '/images/zara.jpg', websiteUrl: 'https://www.nike.com' },
  { name: 'Samsung', imageUrl: '/images/samsung.jpg', websiteUrl: 'https://www.apple.com' },
  { name: 'Amazon', imageUrl: '/images/amazon.jpg', websiteUrl: 'https://www.adidas.com' },
];

const Brands: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 639) {
        setCardsToShow(1);
      } else if (width >= 639 && width < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);

    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + cardsToShow) % brands.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - cardsToShow + brands.length) % brands.length);
  };

  return (
    <section className={styles.brandsSection}>
      <h2>Marques recommandées</h2>
      <div className={styles.brandsContainer}>
        <button onClick={handlePrevious} className={styles.arrowButton}>
          ←
        </button>
        <div className={styles.brandsWrapper}>
          {brands.slice(currentIndex, currentIndex + cardsToShow).map((brand, index) => (
            <div key={index} className={styles.brandCard}>
              <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Image 
                  src={brand.imageUrl} 
                  alt={brand.name} 
                  className={styles.brandImage}
                  width={150} // adjust width as needed
                  height={150} // adjust height as needed
                />
                <p>{brand.name}</p>
              </a>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className={styles.arrowButton}>
          →
        </button>
      </div>
    </section>
  );
};

export default Brands;
