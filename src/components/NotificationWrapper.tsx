import React, {ReactNode, SyntheticEvent, useEffect, useState} from 'react';
import {Alert, Snackbar} from '@mui/material';
import {eventEmitter} from "~/utils/eventEmitter";
import {SnackbarCloseReason} from "@mui/material/Snackbar/Snackbar";

export enum NotificationStatus {
  SUCCESS = 'success',
  INFO = 'info',
  WARRING = 'warning',
  ERROR = 'error'
}

type NotificationData = {
  message: string;
  type: NotificationStatus;
};
const NotificationWrapper = ({ children }: {children: ReactNode}) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationData>({
    type: NotificationStatus.INFO,
    message: ''
  });

  useEffect(() => {
    const showNotification = (data: NotificationData) => {
      setNotification(data);
      setOpen(true);
    };

    // Subscribe to the notification event
    const unsubscribe = eventEmitter.subscribe('notification', showNotification);

    return () => {
      // Unsubscribe from the event when the component is unmounted
      unsubscribe();
    };
  }, []);

  const handleClose = (event: SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={notification.type || "info"} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationWrapper;
