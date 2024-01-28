import React from 'react';
import LoginForm from '~/features/auth/copmonents/login-form';
import {Avatar, Box, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LoginPage = () => {
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
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
