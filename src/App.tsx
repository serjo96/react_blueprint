import {Box, Container} from "@mui/material";

import './App.module.css';
import { AuthProvider } from '~/features/auth/cotext/auth-context';
import AppRoutes from '~/routes/App-Routes';
import Header from "~/layouts/header";
import NotificationWrapper from "~/components/NotificationWrapper";

const App = () => {
  return (
    <NotificationWrapper>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </Box>
      </Container>
    </NotificationWrapper>
  );
};

export default App;
