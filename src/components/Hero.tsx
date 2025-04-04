// src/components/Hero.tsx

import React from 'react';
import styles from '../styles/Hero.module.css';

const Hero: React.FC = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero}>
      <h1>Payez en 4 fois sans intérêt</h1>
      <p>Discover fast, easy, and secure payment solutions.</p>
      <button className={styles.ctaBtn}>Get Started</button>

      {/* Arrow Icon */}
      <div className={styles.arrowWrapper} onClick={scrollToNextSection}>
        <span className={styles.arrow}></span>
      </div>
    </section>
  );
};

export default Hero;
