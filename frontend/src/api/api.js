// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // update this as per your backend
  withCredentials: true,
});

export default api;
