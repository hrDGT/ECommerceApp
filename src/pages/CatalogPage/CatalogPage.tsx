import { CategoriesMenu } from "../../components/CategoriesMenu/CategoriesMenu";
import { TagMenu } from "../../components/TagMenu/TagMenu";
import { CatalogFilters } from "../../components/CatalogFilters/CatalogFilters";
import { CatalogCards } from "../../components/CatalogCards/CatalogCards";

import styles from './CatalogPage.module.css'

export function CatalogPage() {
  return (
    <div className={styles.catalogPage}>
      <div className={styles.categoriesCategories}>
        <CategoriesMenu />
      </div>

      <div className={styles.catalog}>
        <div className={styles.tagMenu}>
          <TagMenu />
        </div>

        <div className={styles.catalogContent}>
          <CatalogFilters />
          <CatalogCards />
        </div>
      </div>
    </div>
  )
}
