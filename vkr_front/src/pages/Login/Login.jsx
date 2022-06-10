import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// eslint-disable-next-line import/no-cycle
import { UserRoleContext } from '../../App';
import axios from '../../services/axios';

import styles from './login.module.css';

const Login = () => {
  const { setUserRole } = useContext(UserRoleContext);

  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);
  const [timerActive, setTimerActive] = useState(false);
  const [countErors, setCountErrors] = useState(0);
  const [accountDisabled, setAccountDisabled] = useState(false);
  const [values, setValues] = useState({
    password: 'test',
    email: 'test',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('users/signin', values)
      // .then((response) => localStorage.setItem('userRole', response.data.values.role))
      .then((response) => {
        setUserRole('1');
        setAccountDisabled(false);
        setCountErrors(0);
        navigate(response.data.values.role === 1 ? '/admin' : '/');
      })
      .catch((error) => {
        if (error.response.data.values.active === 0) {
          setAccountDisabled(true);
        } else {
          if ((countErors + 1) >= 4) {
            setTimerActive(true);
          }

          setAccountDisabled(false);
          setCountErrors(countErors + 1);
        }
      });
  };

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      setTimerActive(false);
      setSeconds(10);
    }
  }, [seconds, timerActive, countErors]);

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
          disabled={timerActive}
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <TextField
          required
          className={styles.inputField}
          disabled={timerActive}
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {!!countErors && !accountDisabled && (
          <p className={styles.errorMessage}>
            Неправильный логин или пароль
            {' '}
            {timerActive && `: ${seconds}`}
            {' '}
          </p>
        )}
        {accountDisabled && (
          <p className={styles.errorMessage}>
            Данный аккаунт заблокирован
          </p>
        )}
        <Button className={styles.button} disabled={timerActive} type="submit" variant="outlined">Login</Button>
      </form>
    </div>
  );
};

export default Login;
