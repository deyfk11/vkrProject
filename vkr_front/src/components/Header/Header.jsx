import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import './header.css';
// eslint-disable-next-line import/no-cycle
import { UserRoleContext } from '../../App';

const Header = () => {
  const { userRole, setUserRole } = useContext(UserRoleContext);

  return (
    <AppBar className="header" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {userRole === '1' && <NavLink className="link" to="/admin">Admin panel</NavLink>}
            {userRole === '1' && <NavLink className="link" to="/addUser">Add user</NavLink>}
            {userRole && (
              <NavLink
                className="link"
                to="/login"
                onClick={() => {
                  localStorage.removeItem('userRole');
                  setUserRole(null);
                }}
              >
                Exit
              </NavLink>
            )}
            {userRole === null && <NavLink className="link" to="/login">Login</NavLink>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
