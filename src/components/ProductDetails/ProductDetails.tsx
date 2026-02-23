import { useState } from 'react';

import type { ProductDetailsProps } from '../../types/product';
import defaultImage from '../../assets/images/default.jpg';

import styles from './ProductDetails.module.css';

export function ProductDetails({ product }: ProductDetailsProps) {
  const [imgSrc, setImgSrc] = useState(product.thumbnail);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <img
            src={isLoading ? defaultImage : imgSrc}
            alt={product.title}
            className={styles.image}
            loading="lazy"
            width="300"
            height="300"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImgSrc(defaultImage);
            }}
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          {product.brand && <p className={styles.brand}>{product.brand}</p>}
          <p className={styles.price}>${product.price}</p>
          {product.discountPercentage && (
            <p className={styles.discount}>Скидка {product.discountPercentage}%</p>
          )}
          {product.rating && <p className={styles.rating}>Рейтинг: {product.rating}</p>}
          {product.stock && <p className={styles.stock}>В наличии: {product.stock} шт.</p>}
          {product.description && <p className={styles.description}>{product.description}</p>}
        </div>
      </div>
    </div>
  );
}
