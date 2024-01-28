import {Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { SyntheticEvent, useState } from 'react';
import {Link} from "react-router-dom";

import { useAuth } from '~/features/auth/cotext/useAuth';
import registerSchema from '~/features/auth/copmonents/validtionRegister';

const RegistrationForm = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatPassword: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

 /* const handleChange = (event: SyntheticEvent) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };*/

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const { error } = registerSchema.validate(formData, { abortEarly: false });

    if (error) {
      const errorMessages: {[key: string]: string} = {};
      error.details.forEach(detail => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
      return;
    }

    // register(userData);
  };

  return (

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                id="repeat-password"
                autoComplete="repeat-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
