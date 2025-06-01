import React from 'react';
import styles from './TopBanner.module.css';

const TopBanner: React.FC = () => {
  return (
    <div className={styles.topBanner}>
      <p>Suscríbete hoy y recibe un 10% de descuento en tu primera compra</p>
    </div>
  );
};

export default TopBanner;