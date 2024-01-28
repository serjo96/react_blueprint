import React, {SyntheticEvent, useState} from 'react';
import { TextField, Button, Box } from '@mui/material';

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
