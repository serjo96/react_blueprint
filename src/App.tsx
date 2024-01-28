import styles from './App.module.css';
import { AuthProvider } from '~/features/auth/cotext/auth-context';
import AppRoutes from '~/routes/App-Routes';

const App = () => {
  return (
    <div className={styles.container}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
};

export default App;
