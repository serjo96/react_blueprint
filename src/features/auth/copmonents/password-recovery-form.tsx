import React, {SyntheticEvent, useEffect, useState} from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import Joi from "joi";

import {resetPasswordValidationSchema} from "~/features/auth/validation/auth-validation";
import AuthAPI from "~/features/auth/AuthAPI";
import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/NotificationWrapper";
import {useAuth} from "~/features/auth/cotext/useAuth";

const PasswordRecoveryForm = () => {
  const {user} = useAuth()
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [unlockTime, setUnlockTime] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Update timer every second
    const interval = setInterval(() => {
      if (unlockTime) {
        const currentTime = Math.floor(Date.now() / 1000);
        const secondsLeft = unlockTime - currentTime;

        if (secondsLeft <= 0) {
          clearInterval(interval);
          setTimer(null);
          setUnlockTime(null);
        } else {
          setTimer(secondsLeft);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [unlockTime]);


  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await resetPasswordValidationSchema.validateAsync(email, { abortEarly: false });
      setError('')

      try {
        await AuthAPI.resetPassword(email)
        eventEmitter.emit(
          EventName.NOTIFICATION,
          {
            message: 'The email with recovery instruction was sent successfully. Check your email.',
            type: NotificationStatus.SUCCESS
          });
      } catch (error) {
        if(error.unlockTime) {
          setError(error.message)
          setTimer(error.unlockTime)
        }
      }


    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        setError(error.message);
      } else {
        setError(error.message)
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
       Recovery password
      </Button>

      {timer && (
        <Typography sx={{ mt: 2 }}>
          Please wait {timer} seconds(s) before sending again.
        </Typography>
      )}
    </Box>
  );
};

export default PasswordRecoveryForm;
