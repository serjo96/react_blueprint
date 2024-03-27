import Joi from 'joi';
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { ProfileValidationSchema } from '~/features/profile/validation/profile-validation';
import { UserDto } from '~/services/api/open-api/models/UserDto';

type FormErrorsState = {
  email: string;
  name: string;
  [key: string]: string | boolean;
};

export type FormStateTypes = {
  name: string;
  email: string;
};

type ProfileFormProps = {
  onSubmit: (params: FormStateTypes) => void;

  user?: Partial<UserDto>;
  errors?: {
    email?: string;
    name?: string;
  };
};

const ProfileForm = ({ onSubmit, user, errors }: ProfileFormProps) => {
  const [validationErrors, setValidationErrors] = useState<
    Partial<FormErrorsState>
  >({});
  const [userData, setUserData] = useState<FormStateTypes>({
    name: (user && user.profile?.name) || '',
    email: (user && user.email) || '',
  });

  // Combine validation errors and API errors for display
  let errorsFields = { ...validationErrors, ...errors };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setValidationErrors({});
      errorsFields = null;
      const values = await ProfileValidationSchema.validateAsync(userData, {
        abortEarly: false,
      });
      onSubmit(values);
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

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={userData.name}
        onChange={handleChange}
        error={!!errorsFields.name}
        helperText={errorsFields.name}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={userData.email}
        onChange={handleChange}
        error={!!errorsFields.email}
        helperText={errorsFields.email}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Save changes
      </Button>
    </Box>
  );
};

export default ProfileForm;
