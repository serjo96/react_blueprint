import React from 'react';
import {Typography, Container} from '@mui/material';
import ProfileForm from "~/features/profile/componnets/profile-form";

const ProfilePage = () => {


  return (
    <Container component="main" maxWidth="sm">
      <Typography component="h1" variant="h5">
        Profile page
      </Typography>
      <ProfileForm/>
    </Container>
  );
};

export default ProfilePage;
