import React from 'react';
import { Product } from '../../types';
import styles from './ProductCard.module.css';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <p className={styles.productBrand}>{product.brand}</p>
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>${product.price.toLocaleString('es-CO')}</p>
        {product.tags && product.tags.length > 0 && (
          <div className={styles.productTags}>
            {product.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;