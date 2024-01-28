import React from 'react';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {Box, Typography} from "@mui/material";
import PasswordRecoveryForm from "~/features/auth/copmonents/password-recovery-form";

const PasswordRecoveryPage = () => {
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
      <PasswordRecoveryForm />
    </Box>
  )};

export default PasswordRecoveryPage;
