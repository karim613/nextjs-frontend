import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Lowerfooter from '../components/Lowerfooter'; // Ensure this import is correct
import styles from '../styles/Pages/AboutUs.module.css';
import Link from 'next/link';

const AboutUs: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.header}>
        <h1>À propos de nous</h1>
      </div>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ul>
            <li><Link href="/about-us">À propos de nous</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/corporate-governance">Gouvernance d'entreprise</Link></li>
            <li><Link href="/sustainability">La durabilité</Link></li>
            <li><Link href="/investor-relations">Investor Relations</Link></li>
          </ul>
        </aside>
        <main className={styles.content}>
          <p>
            Klarna a été fondée en 2005 à Stockholm, en Suède, dans le but de faciliter les achats en ligne. Au cours des
            18 dernières années, la technologie a évolué, stimulé et transformé le monde qui nous entoure, mais notre
            mission reste aussi pertinente que jamais : rendre le paiement aussi simple, transparent et sécurisé que possible.
          </p>
          <p>
            Klarna est aujourd'hui l'une des plus grandes banques européennes et fournit des solutions de paiement à
            150 millions de consommateurs via plus de 500 000 marchands dans 45 pays. Klarna propose des
            paiements directs, des options de paiement après la livraison et des plans de paiement en plusieurs
            versements, le tout avec une expérience d'achat en un clic qui permet aux consommateurs de payer quand
            et comment ils le souhaitent.
          </p>
          <p>
            L'acquisition de SOFORT par l'entreprise en 2014 a donné naissance au Groupe Klarna. Klarna est soutenue
            par des investisseurs tels que Sequoia Capital, Bestseller, Permira, Visa et Atomico.
          </p>
          <p><strong>Klarna France fait partie du Groupe Klarna</strong></p>
          <ul>
            <li>Nombre de clients finaux : 150 000 000</li>
            <li>Nombre de marchands : 500 000+</li>
            <li>Nombre de transactions par jour : 2 000 000</li>
          </ul>
        </main>
      </div>
      <Footer />  {/* Main footer goes here */}
      <Lowerfooter />  {/* Lower footer goes here, at the very end */}
    </div>
  );
};

export default AboutUs;
