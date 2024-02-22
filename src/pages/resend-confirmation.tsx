import React, {useEffect, useState} from 'react';
import {Box, Button, TextField, Typography, Container, Link} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

import {useAuth} from "~/features/auth/cotext/useAuth";
import AuthAPI from "~/features/auth/AuthAPI";
import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/NotificationWrapper";


const ResendConfirmation = () => {
  const {user} = useAuth()
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
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

  const handleResendToken = async () => {
    setError('')

    try {
      await AuthAPI.resendConfirmationToken(email);
      setIsSent(true);
      eventEmitter.emit(
        EventName.NOTIFICATION,
        {
          message: 'Email with instruction for reset password is sent on your email.',
          type: NotificationStatus.SUCCESS
        });
    } catch (error) {
      if(error.unlockTime) {
        setError(error.message)
        setTimer(error.unlockTime)
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
          disabled={!email}
        >
          Send again
        </Button>

        {timer && (
          <Typography sx={{ mt: 2 }}>
            Please wait {timer} seconds(s) before sending again.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResendConfirmation;
