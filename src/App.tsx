import {Box, Container} from "@mui/material";

import './App.module.css';
import { AuthProvider } from '~/features/auth/cotext/auth-context';
import AppRoutes from '~/routes/App-Routes';
import Header from "~/layouts/header";
import NotificationWrapper from "~/components/NotificationWrapper";
import {LoadingProvider} from "~/context/LoadingContext";
import TopProgressBar from "~/components/top-progress-bar";

const App = () => {
  return (
    <NotificationWrapper>
      <LoadingProvider>
        <TopProgressBar />
            <AuthProvider>
              <Header />
              <Container maxWidth="sm">
                <Box sx={{ my: 4 }}>
                    <AppRoutes />
                </Box>
              </Container>
            </AuthProvider>
      </LoadingProvider>
    </NotificationWrapper>
  );
};

export default App;
