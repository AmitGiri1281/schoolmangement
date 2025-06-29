import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  Grid,
  Button,
  IconButton,
  TextField,
  Chip,
  useMediaQuery,
  useTheme,
  Badge,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  Edit as EditIcon,
  CameraAlt as CameraIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Lock as PasswordIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/authSlice';  // Corrected path
import { uploadFile } from '../api/upload';  // Corrected path
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarPreview, setAvatarPreview] = useState('');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
      });
      setAvatarPreview(user.avatar || '');
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      try {
        const uploadedUrl = await uploadFile(file);
        setFormData({ ...formData, avatar: uploadedUrl });
        toast.success('Avatar updated successfully!');
      } catch (error) {
        toast.error('Failed to upload avatar');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 2 : 4 }}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 3,
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            My Profile
          </Typography>
          
          {editMode ? (
            <Box>
              <IconButton
                color="primary"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ mr: 1 }}
              >
                {loading ? <CircularProgress size={24} /> : <CheckIcon />}
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setEditMode(false);
                  setAvatarPreview(user.avatar || '');
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Profile Content */}
        <Grid container spacing={3}>
          {/* Left Column - Avatar & Basic Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  editMode && (
                    <IconButton
                      component="label"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      <CameraIcon fontSize="small" />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </IconButton>
                  )
                }
              >
                <Avatar
                  sx={{
                    width: isMobile ? 80 : 120,
                    height: isMobile ? 80 : 120,
                    fontSize: isMobile ? '2rem' : '3rem',
                    bgcolor: theme.palette.primary.main,
                  }}
                  src={avatarPreview}
                >
                  {user?.firstName?.[0] || 'U'}
                </Avatar>
              </Badge>

              {editMode ? (
                <>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={{ mt: 3, mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Chip
                    label={user?.role || 'User'}
                    color="primary"
                    size="medium"
                    sx={{ mb: 2 }}
                  />
                </>
              )}
            </Box>
          </Grid>

          {/* Right Column - Detailed Info */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {user?.email || 'N/A'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                {editMode ? (
                  <TextField
                    fullWidth
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {user?.phone || 'N/A'}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  User ID
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {user?.id || '#0001'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Joined Date
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {new Date(user?.joinedDate || '2025-01-01').toLocaleDateString()}
                </Typography>
              </Grid>

              {!editMode && (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<PasswordIcon />}
                    onClick={() => setOpenPasswordDialog(true)}
                    sx={{ mt: 2 }}
                  >
                    Change Password
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Change Password Dialog */}
      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Current Password"
            type="password"
          />
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            type="password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;