import React from 'react';
import { Button, Container, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {useAuth} from "~/features/auth/cotext/useAuth";


const ErrorPage = () => {
  const {isAuthenticated} = useAuth()
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { message, description } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const messageFromQuery = queryParams.get('message') || "Something went wrong.";
  const descriptionFromQuery = queryParams.get('description') || "Try going back to the homepage or contact support.";

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
      <ErrorOutlineIcon
        sx={{
          fontSize: 150,
          marginBottom: 4,
          color: 'error.main',
          '&:hover': { animation: 'pulseAnimation 2s infinite' }
        }}
        className="pulse"
      />
      <Typography variant={isMobile ? "h5" : "h4"} component="h1">
          {message || messageFromQuery}
        </Typography>
        <Typography variant="body1">
          {description || descriptionFromQuery}
        </Typography>
        <Box sx={{ '& > :not(style)': { m: 1 }, marginTop: 3}}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Go to Homepage
          </Button>
          <Button variant="outlined" onClick={() => navigate('/contact')}>
            Contact Support
          </Button>
          {!isAuthenticated && (
            <Button variant="outlined" onClick={() => navigate('/sign-in')}>
              Login Page
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ErrorPage;
