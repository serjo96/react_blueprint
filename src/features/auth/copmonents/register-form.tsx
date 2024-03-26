import {Box, Button, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import React, { SyntheticEvent, useState } from 'react';
import {Link} from "react-router-dom";
import Joi from "joi";

import {registrationValidationSchema} from "~/features/auth/validation/auth-validation";
import {InputPassword} from "~/components/input-password";

export type RegisterFormMainFields = {
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormSubmitData = Omit<RegisterFormMainFields, 'confirmPassword'>

type FormErrorsState = RegisterFormMainFields & {
  [key: string]: string | boolean;
}

type RegisterFormProps = {
  onSubmit: (params: RegisterFormSubmitData) => void;
  errors?: {
    email?: string;
    password?: string;
  }
}

const RegistrationForm = ({onSubmit, errors}: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [validationErrors, setValidationErrors] = useState<Partial<FormErrorsState>>({});
  // Combine validation errors and API errors for display
  let errorsFields = { ...validationErrors, ...errors };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setValidationErrors({})
      errorsFields = null
      const {confirmPassword, ...values}: FormErrorsState = await registrationValidationSchema.validateAsync(formData, { abortEarly: false });
      onSubmit(values)
    } catch (error) {
      const errorData = error as Joi.ValidationError;
      const errorMessages = errorData.details.reduce((acc, detail) => {
        const key = detail.path[0] as keyof FormErrorsState;
        acc[key] = detail.message;
        return acc;
        }, {} as FormErrorsState);
      setValidationErrors(errorMessages);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <InputPassword
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            handleChange={handleChange}
            errors={errorsFields.password}
          />
            </Grid>
            <Grid item xs={12}>
              <InputPassword
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                id="confirmPassword"
                value={formData.confirmPassword}
                handleChange={handleChange}
                errors={errorsFields.confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={'/sign-in'}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
  );
};

export default RegistrationForm;
