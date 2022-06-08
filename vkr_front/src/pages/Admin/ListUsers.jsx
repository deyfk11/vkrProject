import React, { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import axios from '../../services/axios';

const ListUsers = ({ users, offices, setUsers }) => {
  const findOffice = (officeId) => {
    const officeName = offices.find((office) => (office.id === officeId));

    return officeName ? officeName.title : '';
  };

  const [choosedUser, setChoosedUser] = useState({});

  const changeActiveUser = async () => {
    await axios.put('users/changeActiveUser', { id: choosedUser.id, active: choosedUser.active === 1 ? 0 : 1 });
    const arrayUsers = users.map((user) => (user.id === choosedUser.id
      ? { ...user, active: choosedUser.active === 1 ? 0 : 1 } : user));

    setUsers(arrayUsers);
  };

  return (
    <div className="listUsers_wrapper">
      <Table aria-label="simple table" className="table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>User Role</TableCell>
            <TableCell>Email Address</TableCell>
            <TableCell>Office</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!users.length && !!offices.length && users.map((row) => (
            <TableRow
              className={`${row.roleId === 1 ? 'adminRow ' : ''}${choosedUser.id === row.id ? 'choosedRow' : ''}`}
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => setChoosedUser(row)}
            >
              <TableCell className={(row.active === 0 && 'disableUserRow')}>{row.firstName}</TableCell>
              <TableCell className={(row.active === 0 && 'disableUserRow')}>{row.lastName}</TableCell>
              <TableCell className={(row.active === 0 && 'disableUserRow')}>{row.lastName}</TableCell>
              <TableCell className={(row.active === 0 && 'disableUserRow')}>{row.roleId === 1 ? 'Administrator' : 'User'}</TableCell>
              <TableCell className={(row.active === 0 && 'disableUserRow')}>{row.email}</TableCell>
              <TableCell className={(row.active === 0 && 'disableUserRow')}>{findOffice(row.officeID)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex">
        <button className="button" type="button" onClick={() => changeActiveUser()}>Enable/Disable Login</button>
      </div>
    </div>
  );
};

export default ListUsers;
