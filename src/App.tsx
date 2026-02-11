import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';

import router from './routes';
import { store } from './store/store';
import styles from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <div className={styles.App}>
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
