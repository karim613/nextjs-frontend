// src/components/Footer.tsx

import React from 'react';
import styles from '../styles/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <h2 className={styles.logo}>Swipe</h2>
        <div className={styles.countrySelector}>
          <span role="img" aria-label="France">🇫🇷</span> France <span className={styles.arrow}>→</span>
        </div>
        <div className={styles.socialIcons}>
          <FontAwesomeIcon icon={faFacebookF} className={styles.icon} />
          <FontAwesomeIcon icon={faLinkedinIn} className={styles.icon} />
          <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
          <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
        </div>
      </div>
      <div className={styles.linksSection}>
        <div className={styles.column}>
          <h3>Swipe</h3>
          <ul>
            <li>À propos de nous</li>
            <li>Carrières</li>
            <li>Aspects juridiques</li>
            <li>Presse</li>
            <li>Confidentialité et sécurité</li>
            <li>La durabilité</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Client</h3>
          <ul>
            <li>Service Client</li>
            <li>Login</li>
            <li>Qu’est ce que Swipe</li>
            <li>L'appli shopping de Swipe</li>
            <li>Boutiques Swipe</li>
            <li>Le blog Swipe</li>
            <li>Politique de protection de l'acheteur Swipe</li>
            <li>Commentaires et réclamations</li>
            <li>Protection contre la fraude</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Marchand</h3>
          <ul>
            <li>Support Marchand</li>
            <li>Portail Marchand</li>
            <li>Vendre avec Swipe</li>
            <li>Portail développeurs</li>
            <li>Statut opérationnel</li>
            <li>Plateformes et partenaires</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
