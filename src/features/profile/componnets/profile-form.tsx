import Joi from 'joi';
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import { ProfileValidationSchema } from '~/features/profile/validation/profile-validation';
import {UserResponseDto} from "~/services/api/open-api";

type FormErrorsState = {
  email: string;
  nickname: string;
  [key: string]: string | boolean;
};

export type FormStateTypes = {
  nickname: string;
  email: string;
};

type ProfileFormProps = {
  onSubmit: (params: FormStateTypes) => void;

  user?: Partial<UserResponseDto>;
  errors?: {
    email?: string;
    nickname?: string;
  };
};

const ProfileForm = ({ onSubmit, user, errors }: ProfileFormProps) => {
  const [validationErrors, setValidationErrors] = useState<
    Partial<FormErrorsState>
  >({});
  const [userData, setUserData] = useState<FormStateTypes>({
    nickname: (user && user.nickname) || '',
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
    setValidationErrors({});
    errorsFields = null;
    const {error, value} = await ProfileValidationSchema.validate(userData, {
      abortEarly: false,
    });

    if(error) {
      const errorData = error as Joi.ValidationError;
      const errorMessages = errorData.details.reduce((acc, detail) => {
        const key = detail.path[0] as keyof FormErrorsState;
        acc[key] = detail.message;
        return acc;
        }, {} as FormErrorsState);
      setValidationErrors(errorMessages);
    } else {
      onSubmit(value);
    }

  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="nickname"
        label="nickname"
        name="nickname"
        autoComplete="nickname"
        autoFocus
        value={userData.nickname}
        onChange={handleChange}
        error={!!errorsFields.nickname}
        helperText={errorsFields.nickname}
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
