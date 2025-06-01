import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './ProductSlider.module.css';
import { getProducts } from '../../services/productService';
import { Product } from '../../types';
import ProductCard from './ProductCard';

const ProductSlider: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <section className={styles.productSliderSection}>
      <div className={styles.sliderHeader}>
        <h2>Lo Nuevo de Glee Wear</h2>
        <div className={styles.navigationArrows}>
          <div className={`${styles.swiperButtonPrev}`}>&lt;</div>
          <div className={`${styles.swiperButtonNext}`}>&gt;</div>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2} /* Default for mobile */
        navigation={{
          nextEl: `.${styles.swiperButtonNext}`,
          prevEl: `.${styles.swiperButtonPrev}`,
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 3.5, /* Desktop */
          },
        }}
        className={styles.swiperContainer}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductSlider;