import React, { SyntheticEvent, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Box, Button, Checkbox, FormControlLabel, Grid, TextField} from "@mui/material";

import { useAuth } from '~/features/auth/cotext/useAuth';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await login({ name, password });
      navigate('/calendar')
    } catch (error) {

    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to={'/password-recovery'}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link to={'/sign-up'}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
