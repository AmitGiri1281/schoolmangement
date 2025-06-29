import axios from 'axios';

/**
 * Sets or removes the Authorization header globally for axios.
 * @param {string|null} token - The auth token to be set. Pass null to remove it.
 */
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
