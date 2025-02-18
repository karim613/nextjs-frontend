// src/components/Features.tsx

import React from 'react';
import styles from '../styles/Features.module.css';

type FeatureProps = {
  title: string;
  description: string;
};

const Features: React.FC = () => {
  const featureData: FeatureProps[] = [
    {
      title: 'Fast Transactions',
      description: 'Experience super fast transactions with our cutting-edge technology.',
    },
    {
      title: 'Secure Payments',
      description: 'Your payments are protected with top-notch security measures.',
    },
    {
      title: 'User-Friendly Interface',
      description: 'Our platform is designed to be intuitive and easy to use for everyone.',
    },
  ];

  return (
    <section className={styles.features}>
      {featureData.map((feature, index) => (
        <div key={index} className={styles.feature}>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;
