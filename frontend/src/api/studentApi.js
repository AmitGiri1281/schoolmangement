import axios from 'axios';

const getAll = () => axios.get('/api/students');
const create = (studentData) => axios.post('/api/students', studentData);
const update = (id, studentData) => axios.put(`/api/students/${id}`, studentData);
const deleteStudent = (id) => axios.delete(`/api/students/${id}`);

export default {
  getAll,
  create,
  update,
  delete: deleteStudent
};