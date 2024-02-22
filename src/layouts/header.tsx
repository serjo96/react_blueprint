import React from 'react';
import {AppBar, Switch, Toolbar, Typography, Button, Box} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import {useThemeContext} from "~/services/themes/ThemeContext";
import {Link} from "react-router-dom";
import {useAuth} from "~/features/auth/cotext/useAuth";


const HeaderLinks = ({ isAuthenticated }: {isAuthenticated: boolean}) => (
  isAuthenticated ? (
    <Link to={'/profile'}>
      <Button sx={{ color: 'white' }} variant="outlined" color="inherit">
        <AccountCircleIcon />
      </Button>
    </Link>
  ) : (
    <Link to={'/sign-in'}>
      <Button sx={{ color: 'white' }} variant="outlined" color="inherit">
        Login
      </Button>
    </Link>
  )
);

const Header = () => {
  const { toggleTheme, mode } = useThemeContext();
  const {isAuthenticated} = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
           <Link to={'/'}>My app logo</Link>
        </Typography>
        <Box display="flex" alignItems="center">
          <Switch
            sx={{ mr: 2 }}
            color="default"
            checked={mode === 'dark'}
            onChange={toggleTheme}
            icon={< Brightness7Icon/>}
            checkedIcon={<Brightness4Icon />}
          />
          <HeaderLinks isAuthenticated={isAuthenticated}></HeaderLinks>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
