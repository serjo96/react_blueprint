import React, { ReactNode, useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { eventEmitter, EventName } from '~/utils/eventEmitter';

export enum NotificationStatus {
  SUCCESS = 'success',
  INFO = 'info',
  WARRING = 'warning',
  ERROR = 'error',
}

type NotificationData = {
  message: string;
  type: NotificationStatus;
};
const NotificationWrapper = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationData>({
    type: NotificationStatus.INFO,
    message: '',
  });

  useEffect(() => {
    const showNotification = (data: NotificationData) => {
      setNotification(data);
      setOpen(true);
    };

    // Subscribe to the notification event
    const unsubscribe = eventEmitter.subscribe(
      EventName.NOTIFICATION,
      showNotification
    );

    return () => {
      // Unsubscribe from the event when the component is unmounted
      unsubscribe();
    };
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        sx={{ cursor: 'pointer' }}
      >
        <Alert
          onClick={handleClose}
          severity={notification.type || 'info'}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default NotificationWrapper;
