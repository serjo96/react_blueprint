import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography, Container, Link} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

import {useAuth} from "~/features/auth/cotext/useAuth";
import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/notification-wrapper";
import {authApi} from "~/services/api/initClient";
import {ResponseError, TokenValidationErrorDto} from "~/services/api/open-api";
import {extractErrorData} from "~/utils/extractErrorData";
import {useCountdownTimer} from "~/hooks/useCountdownTimer";


const ResendConfirmation = () => {
  const {user} = useAuth()
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [timer, setTimer] = useState(null);
  const remainingTime = useCountdownTimer(timer);


  const handleResendToken = async () => {
    setError('')

    try {
      await authApi.authControllerSendEmailVerification({email});
      setIsSent(true);
      eventEmitter.emit(
        EventName.NOTIFICATION,
        {
          message: 'Email with instruction for reset password is sent on your email.',
          type: NotificationStatus.SUCCESS
        });
    } catch (error) {
      if(error instanceof ResponseError) {
        const errorData = await extractErrorData<TokenValidationErrorDto>(error);
        setError(errorData.message)
        if(errorData.payload) {
          setTimer(errorData.payload.unlockTime)
        }
      }
    }
  };

  if (isSent) {
    return (
      <Container maxWidth="sm">
        <Typography variant="body1" sx={{ mt: 4 }}>
          An email has been sent with a new verification token. Please check your email.
        </Typography>
        {!!user && <Link component={RouterLink} to='/sign-in'>Sign in</Link>}
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" sx={{ mt: 4 }}>
        Resending the verification email
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          error={!!error}
          helperText={error}
        />
        <Button
          variant="contained"
          onClick={handleResendToken}
          disabled={!email || timer}
        >
          Send again
        </Button>

        {remainingTime && (
          <Typography sx={{ mt: 2 }}>
            Please wait {remainingTime} before sending again.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResendConfirmation;
