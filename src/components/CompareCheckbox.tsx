import React from 'react';
import styles from '../styles/CompareCheckbox.module.css';

interface CompareCheckboxProps {
  productId: number;
}

const CompareCheckbox: React.FC<CompareCheckboxProps> = ({ productId }) => {
  return (
    <div className={styles.compareBox}>
      <input type="checkbox" id={`compare-${productId}`} />
      <label htmlFor={`compare-${productId}`} className={styles.compareLabel}>
        Compare
      </label>
    </div>
  );
};

export default CompareCheckbox;
