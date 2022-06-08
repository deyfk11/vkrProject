import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header/Header';
import AddUser from './pages/AddUser/AddUser';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Admin />} path="/admin" />
      <Route element={<AddUser />} path="/addUser" />
    </Routes>
  </Router>
);

export default App;
