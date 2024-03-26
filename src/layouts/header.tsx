import React from 'react';
import {AppBar, Switch, Toolbar, Typography, Button, Box, Menu, MenuItem} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import {useThemeContext} from "~/services/themes/ThemeContext";
import {Link as RouterLink, Link} from "react-router-dom";
import {useAuth} from "~/features/auth/cotext/useAuth";




const Header = () => {
  const { toggleTheme, mode } = useThemeContext();
  const {isAuthenticated, logout} = useAuth()


  const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    if (!isAuthenticated) {
      return (
        <Link to={'/sign-in'}>
          <Button sx={{color: 'white'}} variant="outlined" color="inherit">
            Login
          </Button>
        </Link>
      );
    }

    return (
      <React.Fragment>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon/>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <RouterLink to={'/profile'}>My account</RouterLink>
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    );
  };

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
          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
