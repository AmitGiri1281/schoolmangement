import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Checkbox,
  Button,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  CircularProgress,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

const Attendance = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [attendance, setAttendance] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Mock data fetch - replace with actual API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        const dummyData = [
          { id: 1, name: 'Amit Giri', present: true, class: '10A', rollNo: 101 },
          { id: 2, name: 'Riya Sharma', present: false, class: '10A', rollNo: 102 },
          { id: 3, name: 'Rahul Mehta', present: true, class: '10B', rollNo: 201 },
          { id: 4, name: 'Priya Patel', present: null, class: '10B', rollNo: 202 },
          { id: 5, name: 'Vikram Singh', present: false, class: '11A', rollNo: 301 },
        ];
        setAttendance(dummyData);
        setFilteredData(dummyData);
      } catch (error) {
        showSnackbar('Failed to load attendance data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter students based on search term
  useEffect(() => {
    const filtered = attendance.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm, attendance]);

  const toggleAttendance = (id) => {
    const updated = attendance.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setAttendance(updated);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSnackbar('Attendance saved successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to save attendance', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusChip = (present) => {
    if (present === true) {
      return <Chip icon={<CheckIcon />} label="Present" color="success" size="small" />;
    } else if (present === false) {
      return <Chip icon={<CloseIcon />} label="Absent" color="error" size="small" />;
    }
    return <Chip label="Not Marked" color="warning" size="small" />;
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        mb: 3,
        gap: 2
      }}>
        <Typography variant="h4" component="h1">
          <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Attendance Management
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary">
          {format(new Date(), 'EEEE, MMMM do yyyy')}
        </Typography>
      </Box>

      {/* Controls Section */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2,
        mb: 3
      }}>
        <TextField
          size="small"
          placeholder="Search students..."
          variant="outlined"
          fullWidth={isMobile}
          sx={{ 
            flexGrow: 1,
            maxWidth: isMobile ? '100%' : '400px'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Filter attendance">
            <IconButton aria-label="filter">
              <FilterIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Refresh data">
            <IconButton aria-label="refresh">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Attendance Table */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer 
            component={Paper}
            sx={{ 
              maxHeight: 'calc(100vh - 300px)',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2
            }}
          >
            <Table stickyHeader aria-label="attendance table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Roll No</TableCell>
                  {!isMobile && <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>}
                  <TableCell sx={{ fontWeight: 'bold' }}>Student Name</TableCell>
                  {!isTablet && <TableCell sx={{ fontWeight: 'bold' }}>Class</TableCell>}
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Mark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((student) => (
                    <TableRow key={student.id} hover>
                      <TableCell>{student.rollNo}</TableCell>
                      {!isMobile && <TableCell>{student.id}</TableCell>}
                      <TableCell>{student.name}</TableCell>
                      {!isTablet && <TableCell>{student.class}</TableCell>}
                      <TableCell align="center">
                        {getStatusChip(student.present)}
                      </TableCell>
                      <TableCell align="center">
                        <Checkbox
                          checked={student.present === true}
                          indeterminate={student.present === null}
                          onChange={() => toggleAttendance(student.id)}
                          color="primary"
                          inputProps={{ 'aria-label': 'mark attendance' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 4 : isTablet ? 5 : 6} align="center">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Summary and Actions */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 3,
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip 
                label={`Total: ${attendance.length}`} 
                variant="outlined" 
              />
              <Chip 
                label={`Present: ${attendance.filter(s => s.present === true).length}`} 
                color="success" 
                variant="outlined"
              />
              <Chip 
                label={`Absent: ${attendance.filter(s => s.present === false).length}`} 
                color="error" 
                variant="outlined"
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => setOpenDialog(true)}
              disabled={loading}
              size={isMobile ? 'medium' : 'large'}
              fullWidth={isMobile}
            >
              {loading ? 'Saving...' : 'Submit Attendance'}
            </Button>
          </Box>
        </>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Attendance Submission</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to submit attendance for {format(new Date(), 'MMMM do yyyy')}?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Present: {attendance.filter(s => s.present === true).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Absent: {attendance.filter(s => s.present === false).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Not Marked: {attendance.filter(s => s.present === null).length}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              setOpenDialog(false);
              handleSubmit();
            }} 
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Attendance;