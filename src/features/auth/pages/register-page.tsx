import React from 'react';
import RegisterForm from '~/features/auth/copmonents/register-form';
import {Avatar, Box, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const RegisterPage = () => {
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
        Sign up
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
