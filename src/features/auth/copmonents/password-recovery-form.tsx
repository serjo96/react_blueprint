import React, {SyntheticEvent, useState} from 'react';
import { TextField, Button, Box } from '@mui/material';
import Joi from "joi";

import {resetPasswordValidationSchema} from "~/features/auth/validation/auth-validation";
import AuthAPI from "~/features/auth/AuthAPI";
import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/NotificationWrapper";

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState('');
  const [emailError, setErrors] = useState<string>('');


  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await resetPasswordValidationSchema.validateAsync(email, { abortEarly: false });
      setErrors('')
      await AuthAPI.resetPassword(email);

      eventEmitter.emit(
        EventName.NOTIFICATION,
        {
          message: 'The email with recovery instruction was sent successfully. Check your email.',
          type: NotificationStatus.SUCCESS
        });
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        setErrors(error.message);
      } else {
        // Here you can handle errors from the API
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
        error={!!emailError}
        helperText={emailError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
       Recovery password
      </Button>
    </Box>
  );
};

export default PasswordRecoveryForm;
