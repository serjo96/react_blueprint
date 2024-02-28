import React, {useEffect, useState} from 'react';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {Box, Typography} from "@mui/material";

import PasswordRecoveryForm from "~/features/auth/copmonents/password-recovery-form";
import {eventEmitter, EventName} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/notification-wrapper";
import {authApi} from "~/services/api/initClient";

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
      try {
        await authApi.authControllerSendEmailForgotPassword({email})
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
      setError(error.message)
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
  )};

export default PasswordRecoveryPage;
