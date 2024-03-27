import React from 'react';
import {
  Container,
  Typography,
  Box,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import SecurityIcon from '@mui/icons-material/Security';
import BuildIcon from '@mui/icons-material/Build';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Link as RouterLink} from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          🚀 React Template Project
        </Typography>
        <Typography variant="body1" paragraph>
          This project serves as a template for quickly bootstrapping React
          applications that require basic state management with the potential
          for scaling up to more comprehensive state management solutions in the
          future. It includes essential features such as user authentication and
          registration, laying the groundwork for building both simple and
          complex web applications efficiently.
        </Typography>
        <Typography variant="body1" paragraph>
          Authorized users can access the{' '}
          <Link component={RouterLink} to="/protected-page">protected page</Link>, while administrators have
          exclusive access to the <Link component={RouterLink} to="/admin-panel">admin panel</Link>.
        </Typography>
        <Typography variant="body1" paragraph>
          Jumpstart your React applications with this ready-to-use template,
          featuring:
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
          <ListItem>
            <ListItemIcon>
              <VerifiedUserIcon />
            </ListItemIcon>
            <ListItemText primary="Guards for route authorization, ensuring secure access to features based on user roles." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin rights for enhanced control and management within the application." />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          Extend your project with a full-stack solution using a complementary
          backend template:
        </Typography>
        <Typography variant="body1">
          🔗 Backend:
          <Link
            href="https://github.com/serjo96/nestjs-backend_blueprint"
            target="_blank"
            rel="noopener"
          >
            Nest.js + TypeORM + PostgreSQL
          </Link>
        </Typography>
        <Typography variant="body1" paragraph>
          This synergy ensures a seamless development journey from start to
          finish. 🌟
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
