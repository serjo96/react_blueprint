import React, { useState, useEffect } from 'react';
import {Box, Button, TextField} from "@mui/material";
import {loginValidationSchema} from "~/features/auth/validation/auth-validation";
import Joi from "joi";
import {ProfileValidationSchema} from "~/features/profile/validation/profile-validation";
import ProfileApi from "~/features/profile/ProfileApi";
import {useAuth} from "~/features/auth/cotext/useAuth";
import {useLoading} from "~/context/LoadingContext";

type FormErrorsState = {
  email: string;
  password: string;
  name: string;
  [key: string]: string | boolean;
}

const ProfileForm = () => {
  const [errors, setErrors] = useState<Partial<FormErrorsState>>({});
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {user} = useAuth()
  const { setLoading } = useLoading();

  useEffect( () => {
    const fetchUserProfile = async () => {
      if (user.id) {
        try {
          setLoading(true);
          const data = await ProfileApi.getUserProfile(user.id);
          setUserData({
            ...userData,
            ...data
          })
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

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
      await ProfileValidationSchema.validateAsync(userData, {abortEarly: false});
      const updatedUser = await ProfileApi.updateUserProfile(user.id, userData)
      setUserData({
        ...userData,
        ...updatedUser
      })
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
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Имя"
        name="name"
        autoComplete="name"
        autoFocus
        value={userData.name}
        onChange={handleChange}
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
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Новый пароль"
        type="password"
        id="password"
        autoComplete="new-password"
        value={userData.password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save changes
      </Button>
    </Box>
  )
}

export default ProfileForm;