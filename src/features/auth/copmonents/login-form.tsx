import React, { useState } from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Joi from "joi";
import {Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField} from "@mui/material";

import {loginValidationSchema} from "~/features/auth/validation/auth-validation";
import {InputPassword} from "~/components/input-password";

export type LoginFormMainFields = {
  email: string;
  password: string;
  rememberMe: boolean;
}

type FormErrorsState = LoginFormMainFields & {
  [key: string]: string | boolean;
};

type LoginFormProps = {
  onSubmit: (params: FormErrorsState) => void;
  errors?: {
    email?: string;
    password?: string;
  }
}

const LoginForm = ({onSubmit, errors}: LoginFormProps) => {
  const [formData, setFormData] = useState<LoginFormMainFields>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [validationErrors, setValidationErrors] = useState<Partial<FormErrorsState>>({});

  // Combine validation errors and API errors for display
  let errorsFields = { ...validationErrors, ...errors };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setValidationErrors({})
      errorsFields = null
      const value: FormErrorsState = await loginValidationSchema.validateAsync(formData, { abortEarly: false });
      onSubmit(value)
    } catch (error) {
      const errorData = errors as Joi.ValidationError;
      const errorMessages = errorData.details.reduce((acc, detail) => {
        const key = detail.path[0] as keyof FormErrorsState;
        acc[key] = detail.message;
        return acc;
        }, {} as FormErrorsState);
      setValidationErrors(errorMessages);
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
        error={!!errorsFields.email}
        helperText={errorsFields.email}
      />
      <InputPassword
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        handleChange={handleChange}
        errors={errorsFields.password}
      />
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
        }
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
