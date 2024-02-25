import React from 'react';
import RegisterForm from '~/features/auth/copmonents/register-form';
import {Avatar, Box, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/notification-wrapper";
import {useLoading} from "~/context/LoadingContext";
import {useAuth} from "~/features/auth/cotext/useAuth";

const RegisterPage = () => {
  const { register } = useAuth();
  const { startLoading, stopLoading } = useLoading();

  const handleSubmit = async (formData: any) => {
    try {
      startLoading();
      await register(formData);

      eventEmitter.emit(
        EventName.NOTIFICATION,
        {
          message: 'The email with confirm registration was sent on your mail.',
          type: NotificationStatus.SUCCESS
        });
        // navigate('/protected-page');
    } catch (error) {
      // Here you can handle errors from the API
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
        Sign up
      </Typography>
      <RegisterForm onSubmit={handleSubmit}/>
    </Box>
  );
};

export default RegisterPage;
