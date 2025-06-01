import React from 'react';
import styles from './BannerMain.module.css';

const BannerMain: React.FC = () => {
  return (
    <section className={styles.bannerMain}>
      <div className={styles.content}>
        <h1>Glee Wear</h1>
        <p>Performance meets style. Glee moves with you</p>
        <button className={styles.shopNowButton}>Shop Now</button>
      </div>
    </section>
  );
};

export default BannerMain;