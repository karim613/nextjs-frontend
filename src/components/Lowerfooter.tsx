// src/components/Lowerfooter.tsx

import React from 'react';
import styles from '../styles/Lowerfooter.module.css';

const Lowerfooter: React.FC = () => {
    return (
      <footer className={styles.Lowerfooter}>
        <div className={styles.copyright}>
          © 2025 Swipe. All rights reserved.
        </div>
        <div className={styles.bottomLinks}>
          <a href="#">Conditions</a>
          <a href="#">Cookies</a>
          <a href="#">Plan du site</a>
          <a href="#">Swipe.com</a>
        </div>
      


</footer>


  );
};


export default Lowerfooter;