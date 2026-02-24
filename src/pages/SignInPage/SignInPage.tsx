import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import type { User } from '../../types/user';
import { useGetUsersQuery } from '../../api/user';
import { setUser } from '../../store/authSlice';

import styles from './SignInPage.module.css';

export function SignInPage() {
  const { data } = useGetUsersQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!data) return;

    const user = data.users.find(
      (u: User) => u.email === email && u.password === password
    );

    if (user) {
      dispatch(setUser(user));
      navigate('/');
    } else {
      setError('Wrong email or password');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Welcome back!</h2>
        <div className={styles.signUpRow}>
          <p className={styles.text}>Don`t have an account?</p>
          <a href="/sign_up" className={styles.link}>Sign Up</a>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
