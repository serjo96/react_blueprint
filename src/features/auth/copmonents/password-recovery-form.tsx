import React, {SyntheticEvent, useState} from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import Joi from "joi";

import {resetPasswordValidationSchema} from "~/features/auth/validation/auth-validation";
import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/notification-wrapper";

type RecoveryPasswordFormProps = {
  onSubmit: (email: string) => void;
  timer: number;
  error?: string;
}

const PasswordRecoveryForm = ({onSubmit, timer, error}: RecoveryPasswordFormProps) => {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string>(error || '');


  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setValidationError('')
      await resetPasswordValidationSchema.validateAsync(email, { abortEarly: false });

      onSubmit(email)
      eventEmitter.emit(
        EventName.NOTIFICATION,
        {
          message: 'The email with recovery instruction was sent successfully. Check your email.',
          type: NotificationStatus.SUCCESS
        });
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        setValidationError(error.message);
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
        error={!!validationError}
        helperText={validationError}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={Boolean(timer)}
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
