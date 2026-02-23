// Заменил пол на категории, поскольку в товарах не только одежда
// Рендерю только первые 4 категории + All для соответсвтия макету
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { setCategory } from '../../store/categorySlice';
import { useGetProductsQuery } from '../../api/product';
import type { Product } from '../../types/product';

import styles from './CategoriesMenu.module.css';

export function CategoriesMenu() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsQuery();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const categories = data
    ? Array.from(new Set(data.products.map((p: Product) => p.category))).slice(0, 4)
    : [];

  const skeleton = Array(4).fill('');

  return (
    <div className={styles.categoriesMenu}>
      <div className={styles.categoriesContainer}>
        <button
          className={`${styles.categoryItem} ${
            selectedCategory === null ? styles.active : ''
          }`}
          onClick={() => dispatch(setCategory(null))}
        >
          All
        </button>

        {(isLoading ? skeleton : categories).map((cat, i) => (
          <button
            key={cat || i}
            className={`${styles.categoryItem} ${
              cat && selectedCategory === cat ? styles.active : ''
            } ${!cat ? styles.skeleton : ''}`}
            disabled={!cat}
            onClick={() => cat && dispatch(setCategory(cat))}
          >
            {cat.replace(/\b\w/g, (l: string) => l.toUpperCase()) || ''}
          </button>
        ))}
      </div>
    </div>
  );
}
