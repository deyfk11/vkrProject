import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import axios from '../../services/axios';

import SuccessModal from './SuccessModal';

import styles from './addUser.module.css';

const AddUser = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [offices, setOffices] = useState([]);
  const [values, setValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    officeID: '',
    birthdate: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/users/add', values);
    setOpenModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/offices');

      setOffices(data.values);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Add user</p>
      <form onSubmit={handleSubmit}>
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
        <TextField
          required
          className={styles.inputField}
          label="First name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          className={styles.inputField}
          label="Last name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
        <FormControl style={{ width: '100%', marginTop: '20px' }}>
          <InputLabel id="office">Office</InputLabel>
          <Select
            className={styles.selectField}
            id="office"
            label="Office"
            labelId="demo-simple-select-helper-label"
            name="officeID"
            value={values.officeID}
            onChange={handleChange}
          >
            {!!offices.length && offices.map((office) => (
              <MenuItem value={office.id}>{office.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          className={styles.dateField}
          id="date"
          label="Birthday"
          mask="mm/dd/yyyy"
          name="birthdate"
          type="date"
          value={values.birthdate}
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <Button className={styles.button} type="submit" variant="outlined">Save</Button>
          <Button className={styles.cancelButton} type="button" variant="outlined" onClick={() => navigate('/admin')}>Cancel</Button>
        </div>
      </form>
      {openModal && <SuccessModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};

export default AddUser;
