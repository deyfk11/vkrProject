import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import './header.css';

const Header = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <AppBar className="header" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {userRole === '1' && <NavLink className="link" to="/admin">Admin panel</NavLink>}
            {userRole === '1' && <NavLink className="link" to="/addUser">Add user</NavLink>}
            {userRole && <NavLink className="link" to="/exit">Exit</NavLink>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
