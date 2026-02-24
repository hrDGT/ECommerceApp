import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store';
import { useGetProductsQuery } from '../../api/product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { ProductDetails } from '../ProductDetails/ProductDetails';
import type { Product } from '../../types/product';

import styles from './CatalogCards.module.css';

export function CatalogCards() {
  const { data, error, isLoading } = useGetProductsQuery();

  const searchQuery = useSelector((state: RootState) => state.search.query);
  const selectedCategory = useSelector((state: RootState) => state.category.selectedCategory);
  const selectedTag = useSelector((state: RootState) => state.category.selectedTag);
  const sort = useSelector((state: RootState) => state.sort.sort);

  const selectedBrands = useSelector((state: RootState) => state.attributes.brands);
  const selectedWeights = useSelector((state: RootState) => state.attributes.weights);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    setVisibleCount(() => 30);
  }, [
    searchQuery,
    selectedCategory,
    selectedTag,
    sort,
    selectedBrands,
    selectedWeights
  ]);

  const allProducts = useMemo(() => data?.products || [], [data]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (searchQuery) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedTag) {
      result = result.filter(p => p.tags?.includes(selectedTag));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedWeights.length > 0) {
      result = result.filter(p => selectedWeights.includes(p.weight));
    }

    if (sort === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [
    allProducts,
    searchQuery,
    selectedCategory,
    selectedTag,
    sort,
    selectedBrands,
    selectedWeights
  ]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = filteredProducts.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 30);
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка при загрузке товаров</div>;
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className={styles.catalogContainer}>
      <div className={styles.cardsContainer}>
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            discountPercentage={product.discountPercentage}
            thumbnail={product.thumbnail}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Загрузить еще 30
          </button>
        </div>
      )}

      {selectedProduct && (
        <ModalWrapper setIsOpen={handleCloseModal}>
          <ProductDetails product={selectedProduct} onClose={handleCloseModal} />
        </ModalWrapper>
      )}
    </div>
  );
}
