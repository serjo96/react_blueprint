import React, { useEffect, useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Typography } from '@mui/material';

import PasswordRecoveryForm from '~/features/auth/copmonents/password-recovery-form';
import { eventEmitter, EventName } from '~/utils/eventEmitter';
import { NotificationStatus } from '~/components/notification-wrapper';
import { authApi } from '~/services/api/initClient';
import {
  ResponseError,
  TokenValidationErrorDto,
} from '~/services/api/open-api';
import { extractErrorData } from '~/utils/extractErrorData';

const PasswordRecoveryPage = () => {
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
  const handleSubmit = async (email: string) => {
    try {
      await authApi.forgotPassword({ email });

      eventEmitter.emit(EventName.NOTIFICATION, {
        message:
          'The email with recovery instruction was sent successfully. Check your email.',
        type: NotificationStatus.SUCCESS,
      });
    } catch (error) {
      if (error instanceof ResponseError) {
        const errorData =
          await extractErrorData<TokenValidationErrorDto>(error);
        setError(errorData.message);
        if (errorData.payload) {
          setTimer(errorData.payload.unlockTime);
        }
      }
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
      <MailOutlineIcon sx={{ m: 1, fontSize: 40 }} />
      <Typography component="h1" variant="h5">
        Password recovery
      </Typography>
      <PasswordRecoveryForm
        onSubmit={handleSubmit}
        error={error}
        timer={timer}
      />
    </Box>
  );
};

export default PasswordRecoveryPage;
