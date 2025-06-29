import api from './api'; // ✅ Correct import

const getDashboardStats = () => {
  return api.get('/dashboard/stats'); // This hits your backend properly
};

export default {
  getDashboardStats
};
