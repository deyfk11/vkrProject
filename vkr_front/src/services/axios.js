import axios from 'axios';

const API_URL = 'http://localhost:3500/api/';

const customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default customAxios;
