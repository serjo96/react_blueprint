import './App.css';
import { AuthProvider } from '~/features/auth/cotext/auth-context';
import AppRoutes from '~/routes/App-Routes';

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
