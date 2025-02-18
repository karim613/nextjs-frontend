// src/components/Categories.tsx

import React, { useState, useEffect } from 'react';
import styles from '../styles/Categories.module.css';
import Image from "next/image";


type Category = {
  name: string;
  imageUrl: string;
};

const categories: Category[] = [
  { name: 'Technology', imageUrl: '/images/technology.jpg' },
  { name: 'Fashion', imageUrl: '/images/fashion.jpg' },
  { name: 'Home', imageUrl: '/images/home.jpg' },
  { name: 'Beauty', imageUrl: '/images/beauty.jpg' },
  { name: 'Sports', imageUrl: '/images/sports.jpg' },
  { name: 'Travel', imageUrl: '/images/travel.jpg' },
];

const Categories: React.FC = () => {
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
    setCurrentIndex((prevIndex) => (prevIndex + cardsToShow) % categories.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - cardsToShow + categories.length) % categories.length);
  };

  return (
    <section className={styles.categoriesSection}>
      <h2>Parcourez par catégorie</h2>
      <div className={styles.categoriesContainer}>
        <button onClick={handlePrevious} className={styles.arrowButton}>
          ←
        </button>
        <div className={styles.categoriesWrapper}>
          {categories.slice(currentIndex, currentIndex + cardsToShow).map((category, index) => (
            <div key={index} className={styles.categoryCard}>
                <Image 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className={styles.brandImage}
                  width={150} // adjust width as needed
                  height={150} // adjust height as needed
                />
              <p>{category.name}</p>
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

export default Categories;
