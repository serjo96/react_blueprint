import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

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
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100, mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Oops! Page Not Found.
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>
          We can't find the page you're looking for.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
