import {Box, Container} from "@mui/material";

import './App.module.css';
import { AuthProvider } from '~/features/auth/cotext/auth-context';
import AppRoutes from '~/routes/App-Routes';
import Header from "~/layouts/header";

const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Box>
      </Container>
    </>
  );
};

export default App;
