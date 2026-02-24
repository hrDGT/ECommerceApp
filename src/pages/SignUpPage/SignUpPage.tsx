import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { setUser } from '../../store/authSlice';
import { useRegisterUserMutation } from '../../api/user';

import styles from './SignUpPage.module.css';

export function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [addUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const newUser = await addUser({ email, password }).unwrap();
      dispatch(setUser(newUser));
      navigate('/');
    } catch {
      setError('Something went wrong. Try again.');
    }
  };


  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Create an account</h2>
        <div className={styles.signInRow}>
          <p className={styles.text}>Already have an account?</p>
          <a href="/sign_in" className={styles.link}>Sign In</a>
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={styles.input}
            required
          />
          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Registration...' : 'Register'}
          </button>
        </form>
      </div>
    </main>
  );
}
