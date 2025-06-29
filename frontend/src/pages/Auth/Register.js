import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton
} from '@mui/material';
import { PersonAdd, Lock, Email, Person, Home } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' // Default role
  });
  
  const { loading } = useSelector((state) => state.auth);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.firstName || !formData.lastName) {
      toast.error('Please enter both first and last name');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Prepare user data (remove confirmPassword)
    const { firstName, lastName, email, password, role } = formData;
    const userData = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      password,
      role
    };

    try {
      const result = await dispatch(register(userData)).unwrap();
      
      toast.success(`Registration successful! Welcome ${userData.name} as ${role}.`, {
        autoClose: 3000
      });
      
      // Redirect based on role
      setTimeout(() => {
        navigate(`/${role}-dashboard`);
      }, 1500);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific error cases
      if (error.message.includes('already exists') || error.message.includes('already registered')) {
        toast.error('This email is already registered. Please login instead.', {
          action: {
            text: 'Login',
            onClick: () => navigate('/login')
          }
        });
      } else if (error.message.includes('password')) {
        toast.error('Password requirements not met. Use at least 6 characters.');
      } else if (error.message.includes('email')) {
        toast.error('Invalid email format. Please check your email address.');
      } else {
        toast.error(error.message || 'Registration failed. Please try again later.');
      }
    }
  };
  
  return (
    <Container maxWidth="md" sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Back to Home Button */}
      <IconButton 
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: theme.palette.primary.main
        }}
      >
        <Home fontSize="large" />
      </IconButton>
      
      <Box sx={{
        width: '100%',
        p: isMobile ? 3 : 4,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        border: `1px solid ${theme.palette.divider}`
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}>
            <PersonAdd fontSize="large" /> Register
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your EduManagePro account
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <Person sx={{ color: 'action.active', mr: 1 }} />
                  )
                }}
                error={!formData.firstName && formData.firstName === ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                error={!formData.lastName && formData.lastName === ''}
              />
            </Grid>
          </Grid>
          
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <Email sx={{ color: 'action.active', mr: 1 }} />
              )
            }}
            error={formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)}
            helperText={formData.email && !/^\S+@\S+\.\S+$/.test(formData.email) ? 'Enter a valid email' : ''}
          />
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="admin">Administrator</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: 'action.active', mr: 1 }} />
              )
            }}
            error={formData.password.length > 0 && formData.password.length < 6}
            helperText={formData.password.length > 0 && formData.password.length < 6 ? 'Password must be at least 6 characters' : ''}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: 'action.active', mr: 1 }} />
              )
            }}
            error={formData.confirmPassword !== formData.password && formData.confirmPassword.length > 0}
            helperText={formData.confirmPassword !== formData.password && formData.confirmPassword.length > 0 ? 'Passwords do not match' : ''}
          />
          
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate('/login')}
              sx={{
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;