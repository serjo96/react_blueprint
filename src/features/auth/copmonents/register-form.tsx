import {Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { SyntheticEvent, useState } from 'react';
import {Link} from "react-router-dom";

import { useAuth } from '~/features/auth/cotext/useAuth';
import {registrationValidationSchema} from "~/features/auth/validation/auth-validation";
import Joi from "joi";
import {eventEmitter} from "~/utils/eventEmitter";
import {NotificationStatus} from "~/components/NotificationWrapper";

type FormErrorsState = {
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string | boolean;
}

const RegistrationForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [errors, setErrors] = useState<Partial<FormErrorsState>>({});

 /* const handleChange = (event: SyntheticEvent) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };*/

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const value = await registrationValidationSchema.validateAsync(formData, { abortEarly: false });
      setErrors({});
      await register(value);
      eventEmitter.emit(
        'notification',
        {
          message: 'The email with confirm registration was sent on your mail.',
          type: NotificationStatus.SUCCESS
        });
      // navigate('/calendar');
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
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword || ''}
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
