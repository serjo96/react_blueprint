import React from 'react';
import { Typography, Container, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const features = [
  "Access to detailed user profiles",
  "Ability to create and join events",
  "Customizable user settings",
  "Exclusive content and articles",
  "Advanced search options",
  "Priority support and feedback",
];

const ProtectedPage = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Features Available to Registered Users
        </Typography>
        <Typography variant="body1" paragraph>
          As a registered user, you have exclusive access to a wide range of features designed to enhance your experience. Here's what you can look forward to:
        </Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ProtectedPage;
