import { useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import magnifyingGlassIcon from '../../assets/icons/magnifying-glass.svg';
import heartIcon from '../../assets/icons/heart.svg';
import cartIcon from '../../assets/icons/cart.svg';
import userIcon from '../../assets/icons/user.svg';

import styles from './Header.module.css';

export function Header() {
  const navigate = useNavigate();

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.searchSection}>
        <a href="/">
          <img src={logo} className={styles.logo} alt="logo" />
        </a>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchWrapper}>
            <button
              type="submit"
              className={styles.searchButton}
              aria-label="Search"
            >
              <img
                src={magnifyingGlassIcon}
                className={styles.searchIcon}
                alt="search icon"
              />
            </button>

            <input
              type="search"
              name="search"
              className={styles.searchInput}
            />
          </div>
        </form>

      </div>

      <div className={styles.navSection}>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>About us</a>
          <a href="#" className={styles.navLink}>All shops</a>
          <a href="#" className={styles.navLink}>Become a merchant</a>
        </nav>

        <div className={styles.userSection}>
          <button className={styles.iconCounterButton} aria-label="Likes">
            <img src={heartIcon} alt="likes icon" width="20" height="20" />
            <span className={styles.counter}>0</span>
          </button>

          <button
            className={styles.iconCounterButton}
            aria-label="Cart"
          >
            <img src={cartIcon} alt="carticon" width="20" height="20" />
            <span className={styles.counter}>0</span>
          </button>

          <div className={styles.userButtonWrapper}>
              <a href="/sign_in" className={styles.userButton} aria-label="Sign in">
                <img src={userIcon} alt="user icon" width="20" height="20" />
              </a>
            </div>

        </div>
      </div>
      
    </header>
  )
}
