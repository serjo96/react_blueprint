import React from 'react';
import {AppBar, Switch, Toolbar, Typography, Button, Box} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


import {useThemeContext} from "~/services/themes/ThemeContext";
import {Link} from "react-router-dom";

const Header = () => {
  const { toggleTheme, mode } = useThemeContext();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
           <Link to={'/'}>My app logo</Link>
        </Typography>
        <Box display="flex" alignItems="center">
          <Switch
            sx={{marginRight: '15px'}}
            color="default"
            checked={mode === 'dark'}
            onChange={toggleTheme}
            icon={< Brightness7Icon/>}
            checkedIcon={<Brightness4Icon />}
          />
          <Link to={'sign-in'}>
            <Button sx={{color: 'white'}} variant="outlined" color="inherit">
              Login
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
