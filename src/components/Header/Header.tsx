import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { setSearchQuery } from '../../store/searchSlice';
import { CartModal } from '../CartModal/CartModal';
import logo from '../../assets/images/logo.png';
import magnifyingGlassIcon from '../../assets/icons/magnifying-glass.svg';
import heartIcon from '../../assets/icons/heart.svg';
import cartIcon from '../../assets/icons/cart.svg';
import userIcon from '../../assets/icons/user.svg';

import styles from './Header.module.css';

export function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const likesCount = useSelector((state: RootState) => state.likes.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    dispatch(setSearchQuery(query));
    navigate('/');
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
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
            <span className={styles.counter}>{likesCount}</span>
          </button>

          <button
            className={styles.iconCounterButton}
            aria-label="Cart"
            onClick={handleCartClick}
          >
            <img src={cartIcon} alt="carticon" width="20" height="20" />
            <span className={styles.counter}>{cartCount}</span>
          </button>

          {!user && (
          <div className={styles.userButtonWrapper}>
              <a href="/sign_in" className={styles.userButton} aria-label="Sign in">
                <img src={userIcon} alt="user icon" width="20" height="20" />
              </a>
            </div>
          )}

          {user && (
            <div className={styles.userButtonWrapper}>
              <button className={styles.signOutButton} onClick={handleLogout}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
      
      {isCartOpen && <CartModal onClose={handleCloseCart} />}
    </header>
  )
}
