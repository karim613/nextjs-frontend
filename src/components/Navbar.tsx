import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <div className={styles.logo}>Swipe</div>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#">Shopping</a></li>
        <li><a href="#">Finances</a></li>
        <li><a href="#">Qu&apos;est ce que Swipe</a></li>
        <li><a href="#">Aide</a></li>
      </ul>
      <div className={styles.buttonGroup}>
        <button className={`${styles.btn} ${styles.signUpBtn}`}>Inscirvez-vous</button>
        <button className={`${styles.btn} ${styles.loginBtn}`}>Login</button>
      </div>
      <div className={`${styles.overlay} ${isMenuOpen ? styles.showOverlay : ''}`} onClick={closeMenu}></div>
      <div className={`${styles.sideMenu} ${isMenuOpen ? styles.showSideMenu : ''}`}>
        <div className={styles.menuHeader}>
          <span className={styles.closeMenu} onClick={closeMenu}>✕</span>
        </div>
        <ul className={styles.sideNavLinks}>
          <li><a href="#">Acheter avec Swipe</a></li>
          <li><a href="#">Espace entreprises</a></li>
          <hr />
          <li><a href="#">Shopping</a></li>
          <li><a href="#">Finances</a></li>
          <li><a href="#">Qu&apos;est ce que Swipe</a></li>
          <li><a href="#">Aide</a></li>
        </ul>
        <div className={styles.sideButtonGroup}>
          <button className={`${styles.btn} ${styles.sideLoginBtn}`}>Login</button>
          <button className={`${styles.btn} ${styles.downloadBtn}`}>Téléchargez l&apos;appli</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
