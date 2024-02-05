import React, { useState } from 'react';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Joi from "joi";
import {Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField} from "@mui/material";

import { useAuth } from '~/features/auth/cotext/useAuth';
import {loginValidationSchema} from "~/features/auth/validation/auth-validation";

type FormErrorsState = {
  email: string;
  password: string;
  rememberMe: boolean;
  [key: string]: string | boolean;
}
const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Partial<FormErrorsState>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const value = await loginValidationSchema.validateAsync(formData, { abortEarly: false });
      await login(value);
      navigate('/calendar');
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        const errorMessages = error.details.reduce((acc, detail) => {
          const key = detail.path[0] as keyof FormErrorsState;
          acc[key] = detail.message;
          return acc;
        }, {} as FormErrorsState);
        setErrors(errorMessages);
      } else {
        // Here you can handle errors from the API
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
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
        value={formData.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password || ''}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />}
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
          <Link component={RouterLink} to={'/password-recovery'}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to={'/sign-up'}>
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
