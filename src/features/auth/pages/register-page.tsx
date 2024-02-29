import React, {useState} from 'react';
import RegisterForm, {RegisterFormSubmitData} from '~/features/auth/copmonents/register-form';
import {Avatar, Box, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useNavigate} from "react-router-dom";

import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/notification-wrapper";
import {useLoading} from "~/context/LoadingContext";
import {useAuth} from "~/features/auth/cotext/useAuth";
import {ErrorValidationDto} from "~/services/api/open-api";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (formData: RegisterFormSubmitData) => {
    try {
      startLoading();
      setErrors({})
      await register(formData);

      eventEmitter.emit(
        EventName.NOTIFICATION,
        {
          message: 'The email with confirm registration was sent on your mail.',
          type: NotificationStatus.SUCCESS
        });
    } catch (error) {
      const responseErrors = error.response as ErrorValidationDto
      if(responseErrors.errors) {
        setErrors(responseErrors.errors)
      }
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
      <RegisterForm onSubmit={handleSubmit} errors={errors}/>
    </Box>
  );
};

export default RegisterPage;
