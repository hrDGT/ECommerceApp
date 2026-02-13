import { Outlet } from "react-router-dom";

import { Header } from "../components/Header/Header";
import styles from '../App.module.css';

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
}
