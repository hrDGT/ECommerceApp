import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { useGetProductsQuery } from '../../api/product';
import { toggleItem } from '../../store/cartSlice';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import type { Product } from '../../types/product';

import styles from './CartModal.module.css';

type CartModalProps = {
  onClose: () => void;
};

export function CartModal({ onClose }: CartModalProps) {
  const dispatch = useDispatch();
  const { data: productsData, isLoading } = useGetProductsQuery();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartProducts = useMemo(() => {
    if (!productsData) return [];
    const allProducts = productsData.products;
    const cartIds = Object.keys(cartItems).map(Number);
    return allProducts.filter((p: Product) => cartIds.includes(p.id));
  }, [productsData, cartItems]);

  const total = useMemo(() => {
    return cartProducts.reduce((sum, product) => {
      return sum + product.price;
    }, 0);
  }, [cartProducts]);

  const handleRemove = (id: number) => {
    dispatch(toggleItem(id));
  };

  const handleCheckout = () => {
    alert('Will be added soon.');
  };

  if (isLoading) {
    return (
      <ModalWrapper setIsOpen={onClose}>
        <div className={styles.loading}>Loading...</div>
      </ModalWrapper>
    );
  }

  return (
    <ModalWrapper setIsOpen={onClose}>
      <div className={styles.cartModal}>
        <h2 className={styles.title}>Cart</h2>
        {cartProducts.length === 0 ? (
          <p className={styles.empty}>Cart is empty</p>
        ) : (
          <>
            <ul className={styles.list}>
              {cartProducts.map((product) => {
                const price = product.price;

                const fullPrice = product.discountPercentage
                  ? price / (1 - product.discountPercentage / 100)
                  : null;

                return (
                  <li key={product.id} className={styles.item}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className={styles.itemImage}
                      width="50"
                      height="50"
                    />

                    <div className={styles.itemInfo}>
                      <div className={styles.itemTitle}>{product.title}</div>

                      <div className={styles.itemPrice}>
                        {price.toFixed(2)} €
                        {fullPrice && (
                          <span className={styles.oldPrice}>
                            {fullPrice.toFixed(2)} €
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemove(product.id)}
                      aria-label="Remove from cart"
                    >
                      ✕
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className={styles.total}>
              <span>Total:</span>
              <span>{total.toFixed(2)} €</span>
            </div>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </>
        )}
      </div>
    </ModalWrapper>
  );
}
