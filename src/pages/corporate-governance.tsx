// src/pages/corporate-governance.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Lowerfooter from '../components/Lowerfooter';
import styles from '../styles/Pages/CorporateGovernance.module.css';
import Link from 'next/link';

const CorporateGovernance: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.header}>
        <h1>Gouvernance d&apos;entreprise</h1>
      </div>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ul>
            <li><Link href="/about-us">À propos de nous</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/corporate-governance">Gouvernance d&apos;entreprise</Link></li>
            <li><Link href="/sustainability">La durabilité</Link></li>
            <li><Link href="/investor-relations">Investor Relations</Link></li>
          </ul>
        </aside>
        <main className={styles.content}>
          <h2>Statut réglementaire de Klarna</h2>
          <h3>Suède – Finansinspektionen</h3>
          <p>
            Klarna Bank AB (publ) (numéro d&apos;immatriculation 556737-0431) est une société suédoise, dont le siège social
            est situé à Stockholm. Klarna Bank AB (publ) est une société bancaire placée sous la supervision de
            Finansinspektionen (l&apos;autorité suédoise de surveillance financière). Vous pouvez trouver plus d&apos;informations
            sur la licence qui nous permet de fournir des services financiers dans <Link href="#">le registre de Finansinspektionen</Link>.
          </p>
          <p>
            Vous pouvez contacter l&apos;autorité suédoise de surveillance financière à l&apos;adresse suivante :
          </p>
          <p>
            Finansinspektionen<br />
            Box 7821<br />
            103 97 Stockholm<br />
            Sweden
          </p>
          <p>
            Le siège social de Klarna France est situé à Paris. Une saine gouvernance d&apos;entreprise consiste à s&apos;assurer
            de savoir plus sur la manière dont la gouvernance et les contrôles sont organisés chez Klarna, vous trouverez
            <Link href="#"> des informations plus détaillées ici</Link>.
          </p>
        </main>
      </div>
      <Footer />
      <Lowerfooter />
    </div>
  );
};

export default CorporateGovernance;
