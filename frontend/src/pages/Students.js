import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../features/students/studentSlice';

const Students = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const { classes } = useSelector((state) => state.classes);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleOpenDialog = (student = null) => {
    if (student) {
      setCurrentStudent(student);
      setEditMode(true);
    } else {
      setCurrentStudent({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phone: '',
        currentClass: '',
        section: '',
        parents: []
      });
      setEditMode(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentStudent(null);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({
      ...currentStudent,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateStudent(currentStudent));
    } else {
      dispatch(createStudent(currentStudent));
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: 'studentId', headerName: 'ID', width: 120 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { 
      field: 'currentClass', 
      headerName: 'Class', 
      width: 120,
      valueGetter: (params) => params.row.currentClass?.className || ''
    },
    { field: 'section', headerName: 'Section', width: 100 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            onClick={() => handleOpenDialog(params.row)}
          >
            <Edit />
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Student Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Student
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search Students"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredStudents}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          getRowId={(row) => row._id}
          loading={loading}
        />
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={currentStudent?.firstName || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={currentStudent?.lastName || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={currentStudent?.dateOfBirth || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={currentStudent?.gender || ''}
                onChange={handleInputChange}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Address"
              name="address"
              value={currentStudent?.address || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              label="Phone"
              name="phone"
              value={currentStudent?.phone || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Class</InputLabel>
              <Select
                name="currentClass"
                value={currentStudent?.currentClass || ''}
                onChange={handleInputChange}
                label="Class"
              >
                {classes.map((cls) => (
                  <MenuItem key={cls._id} value={cls._id}>
                    {cls.className}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Section"
              name="section"
              value={currentStudent?.section || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Students;