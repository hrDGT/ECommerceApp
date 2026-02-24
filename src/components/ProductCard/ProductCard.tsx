import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { toggleItem } from '../../store/cartSlice';
import { toggleLike } from '../../store/likesSlice';
import type { ProductCardProps } from '../../types/product';
import defaultImage from '../../assets/images/default.jpg';
import cartGray from '../../assets/icons/cart-gray.svg';
import heartWhite from '../../assets/icons/heart-white.svg';
import heartRed from '../../assets/icons/heart.svg';

import styles from './ProductCard.module.css';

export function ProductCard({
  id,
  title,
  price,
  thumbnail,
  discountPercentage,
  onClick
}: ProductCardProps) {
  const fullPrice = discountPercentage
  ? (price / (1 - discountPercentage / 100)).toFixed(2)
  : null;

  const dispatch = useDispatch();
  const isInCart = useSelector((state: RootState) => state.cart.items[id]);
  const isLiked = useSelector((state: RootState) => state.likes.items[id]);


  const [imgSrc, setImgSrc] = useState(thumbnail);
  const [isLoading, setIsLoading] = useState(true);

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleItem(id));
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(id));
  };


  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          src={isLoading ? defaultImage : imgSrc}
          alt={title}
          className={styles.image}
          loading="lazy"
          width="290"
          height="290"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setImgSrc(defaultImage);
          }}
        />

        <div
          className={styles.likeWrapper}
          onClick={handleLikeClick}
          role="button"
          tabIndex={0}
          aria-label={isLiked ? "Remove from likes" : "Add to likes"}
        >
          <img
            src={isLiked ? heartRed : heartWhite}
            className={styles.likeIcon}
            alt="like"
            width="24"
            height="24"
          />
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.bottomRow}>
          <div className={styles.priceWrapper}>
            <p className={styles.price}>{price} €</p>

            {fullPrice && (
              <p className={styles.fullPrice}>{fullPrice} €</p>
            )}
          </div>

          <button
            className={`${styles.cartBtn} ${isInCart ? styles.activeCart : ''}`}
            onClick={handleCartClick}
            aria-label={isInCart ? "Remove from cart" : "Add to cart"}
          >
            {isInCart ? (
              <span className={styles.cartText}>Added</span>
            ) : (
              <img
                src={cartGray}
                alt="cart"
                width="22"
                height="22"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
