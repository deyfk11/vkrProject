import React, { createContext, useState, useMemo } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import AddUser from './pages/AddUser/AddUser';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';

export const UserRoleContext = createContext({
  userRole: localStorage.getItem('userRole') || null,
  setUserRole: () => {},
});

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const value = { userRole, setUserRole };

  return (
    <UserRoleContext.Provider value={value}>
      <Router>
        <Header />
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Admin />} path="/admin" />
          <Route element={<AddUser />} path="/addUser" />
        </Routes>
      </Router>
    </UserRoleContext.Provider>
  );
};

export default App;
