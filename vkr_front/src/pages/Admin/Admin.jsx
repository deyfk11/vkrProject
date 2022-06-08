import React, { useState, useEffect } from 'react';

import ListUsers from './ListUsers';

import './admin.css';
import axios from '../../services/axios';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await axios.get('/users');
      const officesData = await axios.get('/offices');

      setUsers(usersData.data.values);
      setOffices(officesData.data.values);
    };

    fetchData();
  }, []);

  if (!users.length) return;

  return (
    <div className="wrapper">
      <ListUsers offices={offices} setUsers={setUsers} users={users} />
    </div>
  );
};

export default Admin;
