// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // 🔐 getting token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ attaching token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
