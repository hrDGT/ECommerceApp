import { useState, useMemo, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { setSort } from '../../store/sortSlice';
import { toggleBrand, toggleWeight } from '../../store/attributeFilterSlice';
import { useGetProductsQuery } from '../../api/product';

import styles from './CatalogFilters.module.css';

export function CatalogFilters() {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.sort.sort);

  const selectedBrands = useSelector((state: RootState) => state.attributes.brands);
  const selectedWeights = useSelector((state: RootState) => state.attributes.weights);

  const { data } = useGetProductsQuery();

  const [openBrand, setOpenBrand] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);

  const brandRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        brandRef.current &&
        !brandRef.current.contains(e.target as Node)
      ) {
        setOpenBrand(false);
      }

      if (
        weightRef.current &&
        !weightRef.current.contains(e.target as Node)
      ) {
        setOpenWeight(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const brands = useMemo(() => {
    if (!data) return [];
    const set = new Set<string>();
    data.products.forEach(p => p.brand && set.add(p.brand));
    return Array.from(set).sort();
  }, [data]);

  const weights = useMemo(() => {
    if (!data) return [];
    const set = new Set<number>();
    data.products.forEach(p => typeof p.weight === 'number' && set.add(p.weight));
    return Array.from(set).sort((a, b) => a - b);
  }, [data]);

  return (
    <div className={styles.filters}>
      <div className={styles.dropdownRow}>

        <div className={styles.dropdown} ref={brandRef}>
          <button
            className={styles.dropdownBtn}
            onClick={() => setOpenBrand(prev => !prev)}
          >
            Brand {selectedBrands.length > 0 ? `(${selectedBrands.length})` : ""}
            <span className={styles.arrow}>▼</span>
          </button>

          {openBrand && (
            <div className={styles.menu}>
              {brands.map(b => (
                <div
                  key={b}
                  className={styles.menuItem}
                  onClick={() => dispatch(toggleBrand(b))}
                >
                  {selectedBrands.includes(b) && <span className={styles.check}>✓</span>}
                  {b}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.dropdown} ref={weightRef}>
          <button
            className={styles.dropdownBtn}
            onClick={() => setOpenWeight(prev => !prev)}
          >
            Weight {selectedWeights.length > 0 ? `(${selectedWeights.length})` : ""}
            <span className={styles.arrow}>▼</span>
          </button>

          {openWeight && (
            <div className={styles.menu}>
              {weights.map(w => (
                <div
                  key={w}
                  className={styles.menuItem}
                  onClick={() => dispatch(toggleWeight(w))}
                >
                  {selectedWeights.includes(w) && <span className={styles.check}>✓</span>}
                  {w}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(selectedBrands.length > 0 || selectedWeights.length > 0) && (
        <div className={styles.chipsRow}>
          {selectedBrands.map(b => (
            <div key={b} className={styles.chip}>
              <span className={styles.chipLabel}>{b}</span>
              <button
                className={styles.chipClose}
                onClick={() => dispatch(toggleBrand(b))}
              >
                ×
              </button>
            </div>
          ))}

          {selectedWeights.map(w => (
            <div key={w} className={styles.chip}>
              <span className={styles.chipLabel}>{w}</span>
              <button
                className={styles.chipClose}
                onClick={() => dispatch(toggleWeight(w))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.sortBlock}>
        <span className={styles.label}>Sort by:</span>

        <button
          className={`${styles.sortBtn} ${sort === 'asc' ? styles.active : ''}`}
          onClick={() => dispatch(setSort(sort === 'asc' ? null : 'asc'))}
        >
          Ascending price
        </button>

        <button
          className={`${styles.sortBtn} ${sort === 'desc' ? styles.active : ''}`}
          onClick={() => dispatch(setSort(sort === 'desc' ? null : 'desc'))}
        >
          Descending price
        </button>
      </div>
    </div>
  );
}
