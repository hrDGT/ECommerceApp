// Заменил categories на tags для реализации вложенности
// Категорий у продуктов всегда одна, а тегов бывает по несколько
// Первый берется как основной, остальные вложенные

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetProductsQuery } from '../../api/product';
import { setTag } from '../../store/categorySlice';
import type { Product } from '../../types/product';
import chevron from '../../assets/icons/сhevron.svg';

import styles from './TagMenu.module.css';

export function TagMenu() {
  const dispatch = useDispatch();
  const { data } = useGetProductsQuery();
  const [openMain, setOpenMain] = useState<string | null>(null);

  if (!data) return null;

  const tagGroups: Record<string, Set<string>> = {};

  data.products.forEach((product: Product) => {
    if (!product.tags || product.tags.length === 0) return;

    const [main, ...rest] = product.tags;

    if (!tagGroups[main]) {
      tagGroups[main] = new Set();
    }

    rest.forEach(tag => tagGroups[main].add(tag));
  });

  const mainTags = Object.keys(tagGroups);

  const handleMainClick = (tag: string) => {
    const hasSub = tagGroups[tag].size > 0;

    if (!hasSub) {
      dispatch(setTag(tag));
      return;
    }

    setOpenMain(prev => (prev === tag ? null : tag));
  };

  const handleSubClick = (tag: string) => {
    dispatch(setTag(tag));
  };
  return (
    <div className={styles.tagMenu}>
      <h2 className={styles.title}>Tags</h2>

      <ul className={styles.list}>
        {mainTags.map(main => {
          const subTags = Array.from(tagGroups[main]);
          const isOpen = openMain === main;

          return (
            <li key={main} className={styles.item}>
              <div
                className={styles.mainRow}
                onClick={() => handleMainClick(main)}
              >
                <span>{main.replace(/\b\w/g, (l: string) => l.toUpperCase())}</span>

              {subTags.length > 0 && (
                <img
                  src={chevron}
                  alt="chevron"
                  className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
                />
              )}
              </div>

              {isOpen && subTags.length > 0 && (
                <ul className={styles.subList}>
                  {subTags.map(sub => (
                    <li
                      key={sub}
                      className={styles.subItem}
                      onClick={() => handleSubClick(sub)}
                    >
                      {sub.replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
