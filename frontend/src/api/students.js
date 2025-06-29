import axios from 'axios';

const API_URL = '/api/students';

// Create axios instance with base config
const studentApi = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for auth token
studentApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
studentApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const message = error.response.data?.message || 
                     error.response.statusText || 
                     'Student request failed';
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject(new Error('Network error - no response received'));
    } else {
      // Something happened in setting up the request
      return Promise.reject(new Error('Request setup error'));
    }
  }
);

// Get all students with optional query params
const getStudents = async (params = {}) => {
  try {
    const response = await studentApi.get('', { params });
    return response;
  } catch (error) {
    console.error('Failed to fetch students:', error.message);
    throw error;
  }
};

// Create new student
const createStudent = async (studentData) => {
  try {
    const response = await studentApi.post('', studentData);
    return response;
  } catch (error) {
    console.error('Failed to create student:', error.message);
    throw error;
  }
};

// Update existing student
const updateStudent = async (studentId, studentData) => {
  try {
    const response = await studentApi.put(`/${studentId}`, studentData);
    return response;
  } catch (error) {
    console.error(`Failed to update student ${studentId}:`, error.message);
    throw error;
  }
};

// Delete student
const deleteStudent = async (studentId) => {
  try {
    const response = await studentApi.delete(`/${studentId}`);
    return response;
  } catch (error) {
    console.error(`Failed to delete student ${studentId}:`, error.message);
    throw error;
  }
};

// Get student by ID
const getStudentById = async (studentId) => {
  try {
    const response = await studentApi.get(`/${studentId}`);
    return response;
  } catch (error) {
    console.error(`Failed to fetch student ${studentId}:`, error.message);
    throw error;
  }
};

const studentService = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  // Export the axios instance for custom requests
  api: studentApi,
};

export default studentService;