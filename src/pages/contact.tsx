// src/pages/contact.tsx

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Lowerfooter from '../components/Lowerfooter'; // Ensure this import is correct
import styles from '../styles/Pages/Contact.module.css';
import Link from 'next/link';

const Contact: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.header}>
        <h1>Contact</h1>
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
          <h2>Service client</h2>
          <p>
            Consultez la page du <Link href="https://www.youtube.com/">Service client</Link> pour trouver les coordonnées, les heures d'ouverture et les réponses aux questions les plus souvent posées.
          </p>
          <p>
            Sur notre <Link href="#">portail Klarna</Link>, vous pouvez consulter tous vos achats en un seul endroit. Une fois connecté à votre compte Klarna, vous pouvez payer et traiter vos commandes en toute simplicité.
          </p>
          <h2>Uniquement pour les autorités de réglementation</h2>
          <p>
            Utilisez l'une des options suivantes pour nous contacter :
          </p>
          <p><strong>Adresse postale :</strong></p>
          <p>Klarna AB<br />
            Sveavägen 46<br />
            SE-111 34 Stockholm<br />
            Sweden
          </p>
          <p><strong>Téléphone :</strong></p>
          <p>Trouvez <Link href="#">ici</Link> nos coordonnées et horaires d'ouvertures.</p>
          <p>
            Si vous êtes déjà inscrit comme vendeur chez Klarna et que vous avez besoin d'aide, consultez nos pages <Link href="#">d'assistance aux commerçants</Link> pour trouver les coordonnées, les heures d'ouverture et les réponses aux questions les plus souvent posées.
          </p>
          <h2>Ventes</h2>
          <p>
            Vous avez une boutique en ligne ? Vous souhaitez vendre avec Klarna ? Vous trouverez plus d'informations sur nos <Link href="#">pages consacrées aux entreprises</Link>.
          </p>
          <h2>Confidentialité</h2>
          <p>
            Consultez la <Link href="#">politique de confidentialité de Klarna</Link> pour obtenir des informations détaillées sur la manière dont nous traitons vos données.
          </p>
          <h2>Médias</h2>
          <p>
            Sur notre <Link href="#">page presse</Link>, vous trouverez les interlocuteurs, les images et les communiqués de presse dont vous avez besoin.
          </p>
          <h2>Klarna France</h2>
          <p>
            33 rue La Fayette<br />
            75009 Paris<br />
            France
          </p>
          <h2>Siège social Klarna AB</h2>
          <p>
            Sveavägen 46<br />
            SE-111 34 Stockholm<br />
            Sweden
          </p>
        </main>
      </div>
      <Footer />
      <Lowerfooter />
    </div>
  );
};

export default Contact;
