import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Box, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import LoginForm, {
  LoginFormMainFields,
} from '~/features/auth/copmonents/login-form';
import { useAuth } from '~/features/auth/cotext/useAuth';
import { useLoading } from '~/context/LoadingContext';

const LoginPage = () => {
  const { login, loginWithToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    // Function for Parsing Query URL parameters
    const searchParams = new URLSearchParams(location.search);
    const tempToken = searchParams.get('token');

    if (tempToken) {
      // If there is a temporary token in the URL, we try to authorize the user    if (tempToken) {
      startLoading();
      loginWithToken(tempToken)
        .then(() => {
          navigate('/protected-page');
        })
        .finally(() => {
          stopLoading();
        });
    }
  }, [location.search, navigate]);

  const handleSubmit = async (formData: LoginFormMainFields) => {
    try {
      startLoading();
      await login(formData);
    } catch (error) {
      // Here you can handle errors from the API and pass into login component if its needs.
    } finally {
      stopLoading();
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <LoginForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default LoginPage;
