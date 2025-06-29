import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Avatar,
  Chip,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Tooltip,
  Menu,
  MenuItem,
  CircularProgress,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  PersonAdd as PersonAddIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers, deleteTeacher } from '../store/slices/teachersSlice';
import { motion } from 'framer-motion';
import TeacherForm from '../components/teachers/TeacherForm';
import { toast } from 'react-toastify';
import ListItemIcon from '@mui/material/ListItemIcon';

const Teachers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector((state) => state.teachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTeacher, setActiveTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleMenuOpen = (event, teacher) => {
    setAnchorEl(event.currentTarget);
    setActiveTeacher(teacher);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveTeacher(null);
  };

  const handleEdit = () => {
    setSelectedTeacher(activeTeacher);
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    dispatch(deleteTeacher(activeTeacher.id))
      .unwrap()
      .then(() => toast.success('Teacher deleted successfully'))
      .catch((err) => toast.error(err.message));
    handleMenuClose();
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm) ||
      teacher.subject.toLowerCase().includes(searchTerm) ||
      teacher.email.toLowerCase().includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'On Leave':
        return 'warning';
      case 'Inactive':
        return 'error';
      default:
        return 'info';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Teachers Management
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: isMobile ? '100%' : 'auto',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <TextField
            size="small"
            placeholder="Search teachers..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
            sx={{
              width: isMobile ? '100%' : 300,
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedTeacher(null);
              setOpenDialog(true);
            }}
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            Add Teacher
          </Button>
        </Box>
      </Box>

      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        elevation={3}
        sx={{ borderRadius: 3, overflow: 'hidden' }}
      >
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
              <TableRow>
                {!isMobile && <TableCell>ID</TableCell>}
                <TableCell>Teacher</TableCell>
                <TableCell>Subject</TableCell>
                {!isMobile && <TableCell>Contact</TableCell>}
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <TableRow
                    key={teacher.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {!isMobile && <TableCell>{teacher.id}</TableCell>}
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          variant="dot"
                          color={
                            teacher.status === 'Active' ? 'success' : 'error'
                          }
                        >
                          <Avatar
                            src={teacher.avatar}
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: theme.palette.primary.main,
                            }}
                          >
                            {teacher.name.charAt(0)}
                          </Avatar>
                        </Badge>
                        <Box>
                          <Typography fontWeight={500}>{teacher.name}</Typography>
                          {isMobile && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5 }}
                            >
                              {teacher.email}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    {!isMobile && (
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Email">
                            <IconButton
                              size="small"
                              href={`mailto:${teacher.email}`}
                            >
                              <MailIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          {teacher.phone && (
                            <Tooltip title="Call">
                              <IconButton
                                size="small"
                                href={`tel:${teacher.phone}`}
                              >
                                <PhoneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    )}
                    <TableCell>
                      <Chip
                        label={teacher.status}
                        color={getStatusColor(teacher.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, teacher)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <AccountCircleIcon
                        sx={{ fontSize: 60, color: 'text.disabled' }}
                      />
                      <Typography color="text.secondary">
                        No teachers found
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<PersonAddIcon />}
                        onClick={() => setOpenDialog(true)}
                      >
                        Add New Teacher
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Teacher Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
        </DialogTitle>
        <DialogContent>
          <TeacherForm
            teacher={selectedTeacher}
            onSuccess={() => {
              setOpenDialog(false);
              dispatch(fetchTeachers());
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Teachers;