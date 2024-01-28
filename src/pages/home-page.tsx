import React from 'react';
import { Container, Typography, Box, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer'; // Example icon
import SecurityIcon from '@mui/icons-material/Security'; // Example icon
import BuildIcon from '@mui/icons-material/Build'; // Example icon

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          🚀 React Template Project
        </Typography>
        <Typography variant="body1" paragraph>
          Jumpstart your React applications with this ready-to-use template, featuring:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <ComputerIcon />
            </ListItemIcon>
            <ListItemText primary="Basic to advanced state management for scalability." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="User authentication and registration capabilities." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Efficient groundwork for both simple and complex web apps." />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          Extend your project with a full-stack solution using a complementary backend template:
        </Typography>
        <Typography variant="body1">
          🔗 Backend:
          <Link href="https://github.com/serjo96/nestjs-backend_blueprint" target="_blank" rel="noopener">
            Nest.js + TypeORM + PostgreSQL
          </Link>
        </Typography>
        <Typography variant="body1" paragraph>
          This synergy ensures a seamless development journey from start to finish. 🌟
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
