import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import axios from '../../services/axios';

import styles from './login.module.css';

const Login = () => {
  const [countErors, setCountErrors] = useState(0);
  const [values, setValues] = useState({
    password: 'test',
    email: 'test',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('users/signin', values)
      .then((response) => localStorage.setItem('userRole', response.data.values.role))
      .catch(() => setCountErrors(countErors + 1));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  return (
    <div className={styles.wrapper}>
      <form className="form" onSubmit={handleSubmit}>
        <p className={styles.title}>Login</p>
        <TextField
          required
          className={styles.inputField}
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <TextField
          required
          className={styles.inputField}
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {!!countErors && <p className={styles.errorMessage}>Неправильный логин или пароль</p>}
        <Button className={styles.button} type="submit" variant="outlined">Login</Button>
      </form>
    </div>
  );
};

export default Login;
