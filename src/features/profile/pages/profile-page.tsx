import React, {useEffect, useState} from 'react';
import {Typography, Container} from '@mui/material';

import ProfileForm, {FormStateTypes} from "~/features/profile/componnets/profile-form";
import {useAuth} from "~/features/auth/cotext/useAuth";
import {useLoading} from "~/context/LoadingContext";
import {usersApi} from "~/services/api/initClient";
import {ProfileValidationSchema} from "~/features/profile/validation/profile-validation";
import {CustomValidationErrorDto} from "~/services/api/open-api";

const ProfilePage = () => {
  const { user } = useAuth();
  const [errors, setErrors] = useState({});
  const { startLoading,stopLoading } = useLoading();
   const [userData, setUserData] = useState({
    email: user && user.email || '',
  });

  useEffect(
    () => {
      const fetchUserProfile = async () => {
        if (user.id) {
          try {
            startLoading();
            const data = await usersApi.getUserProfile({id: user.id});
            setUserData({
              ...userData,
              ...data
            })
          } finally {
            stopLoading()
          }
        }
      };

      fetchUserProfile();
    }, [user]);


  const handleSubmit = async (data: FormStateTypes) => {
    try {
      await ProfileValidationSchema.validateAsync(userData, {abortEarly: false});
      const updatedUser = await usersApi.editUser({
        id: user.id,
        updateUserBodyDto: data
      })
      setUserData({
        ...userData,
        ...updatedUser
      })
    } catch (error) {
      const responseErrors = error.response as CustomValidationErrorDto
      if(responseErrors.errors) {
        setErrors(responseErrors.errors)
      }
    } finally {
      stopLoading();
    }
  }


  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        Profile page
      </Typography>
      <ProfileForm
        onSubmit={handleSubmit}
        user={userData}
        errors={errors}
      />
    </Container>
  );
};

export default ProfilePage;
