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
  IconButton
} from '@mui/material';
import { Login as LoginIcon, Lock, Email, Home } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { loading } = useSelector((state) => state.auth);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const resultAction = await dispatch(login(formData));

      if (login.fulfilled.match(resultAction)) {
        const { token, user } = resultAction.payload;

        // Save token to localStorage
        localStorage.setItem('token', token);

        toast.success(`Login successful! Welcome back, ${user.name || user.email}`);
        
        // Redirect based on user role (optional)
        navigate(`/${user.role}-dashboard`);
      } else if (login.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload?.message || resultAction.error?.message;
        
        // Handle specific error cases
        if (errorMessage.includes('password')) {
          toast.error('Incorrect password. Please try again.');
        } else if (errorMessage.includes('not found') || errorMessage.includes('no user')) {
          toast.error('Email not registered. Please sign up first.');
        } else if (errorMessage.includes('invalid')) {
          toast.error('Invalid email format. Please check your email address.');
        } else {
          toast.error(errorMessage || 'Login failed. Please try again.');
        }
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ 
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
            <LoginIcon fontSize="large" /> Login
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back to EduManagePro
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
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
            helperText={formData.email && !/^\S+@\S+\.\S+$/.test(formData.email) ? 'Enter a valid email address' : ''}
          />
          
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
              'Sign In'
            )}
          </Button>
        </form>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link 
              component="button"
              variant="body2"
              onClick={() => navigate('/register')}
              sx={{ 
                fontWeight: 500,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Register here
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <Link 
              component="button"
              variant="body2"
              onClick={() => navigate('/forgot-password')}
              sx={{ 
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Forgot password?
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;