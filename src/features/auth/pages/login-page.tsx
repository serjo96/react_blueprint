import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Avatar, Box, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import LoginForm, {LoginFormMainFields} from '~/features/auth/copmonents/login-form';
import {useAuth} from "~/features/auth/cotext/useAuth";
import {loginValidationSchema} from "~/features/auth/validation/auth-validation";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData: LoginFormMainFields) => {
    try {
      const value = await loginValidationSchema.validateAsync(formData, { abortEarly: false });
      await login(value);
      navigate('/calendar');
    } catch (error) {
        // Here you can handle errors from the API
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
