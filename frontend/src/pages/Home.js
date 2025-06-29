import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Avatar,
  Chip
} from '@mui/material';
import {
  School as SchoolIcon,
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  BarChart as AnalyticsIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  Security as AdminIcon,
  Person as TeacherIcon,
  School as StudentIcon,
  FamilyRestroom as ParentIcon,
  ArrowForward as ArrowForwardIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const features = [
  {
    icon: <ClassIcon fontSize="large" color="primary" />,
    title: "Smart Class Management",
    description: "Effortlessly organize classes with automated scheduling and real-time updates."
  },
  {
    icon: <AssignmentIcon fontSize="large" color="primary" />,
    title: "Digital Attendance",
    description: "Biometric integration with facial recognition and automated parent notifications."
  },
  {
    icon: <PeopleIcon fontSize="large" color="primary" />,
    title: "Comprehensive Profiles",
    description: "Detailed academic histories with performance analytics and behavior tracking."
  },
  {
    icon: <AnalyticsIcon fontSize="large" color="primary" />,
    title: "Advanced Analytics",
    description: "AI-powered insights with predictive performance modeling and custom reports."
  }
];

const roleOptions = [
  {
    role: 'admin',
    icon: <AdminIcon sx={{ fontSize: 40 }} />,
    title: 'Administrator',
    description: 'Full system control and institutional management',
    color: '#4e342e',
    path: '/admin-dashboard'
  },
  {
    role: 'teacher',
    icon: <TeacherIcon sx={{ fontSize: 40 }} />,
    title: 'Educator',
    description: 'Class management and student assessment tools',
    color: '#1565c0',
    path: '/teacher-dashboard'
  },
  {
    role: 'student',
    icon: <StudentIcon sx={{ fontSize: 40 }} />,
    title: 'Student',
    description: 'Personalized learning portal and resource access',
    color: '#2e7d32',
    path: '/student-dashboard'
  },
  {
    role: 'parent',
    icon: <ParentIcon sx={{ fontSize: 40 }} />,
    title: 'Parent',
    description: 'Real-time child monitoring and communication',
    color: '#6a1b9a',
    path: '/parent-dashboard'
  }
];

const stats = [
  { value: '150+', label: 'Partner Schools', icon: <SchoolIcon color="primary" /> },
  { value: '10K+', label: 'Active Users', icon: <PeopleIcon color="primary" /> },
  { value: '24/7', label: 'Support Coverage', icon: <CheckCircleIcon color="primary" /> }
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Redirect authenticated users to their dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(roleOptions.find(r => r.role === role)?.path || '/dashboard');
    }
  }, [isAuthenticated, role, navigate]);

  const handleRoleNavigation = (path) => {
    navigate('/register', { state: { role: path } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: 10,
          px: 2,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              gutterBottom
              sx={{ fontWeight: 800, letterSpacing: '0.5px' }}
            >
              Transform Education with <span style={{ color: theme.palette.secondary.light }}>EduManagePro</span>
            </Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="h2" gutterBottom sx={{ mb: 4 }}>
              The next-generation school management platform powered by AI
            </Typography>
            <Stack
              direction={isMobile ? 'column' : 'row'}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<LoginIcon />}
                onClick={() => navigate('/login')}
                sx={{ px: 4, py: 1.5, fontWeight: 600 }}
              >
                Educator Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SignupIcon />}
                onClick={() => navigate('/register')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  bgcolor: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)'
                  }
                }}
              >
                Start Free Trial
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 6, color: theme.palette.text.primary }}
        >
          Revolutionize Your Institution
        </Typography>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <Grid container spacing={{ xs: 4, sm: 6 }}>
            {features.map((feature, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)'
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        width: 80,
                        height: 80,
                        mb: 3
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Role Selection Section */}
      <Box sx={{ backgroundColor: theme.palette.grey[100], py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
            Experience Tailored For You
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent="center">
            {roleOptions.map((option, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: 3,
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-5px)'
                      }
                    }}
                    onClick={() => handleRoleNavigation(option.role)}
                  >
                    <Box
                      sx={{
                        bgcolor: option.color,
                        color: 'white',
                        p: 3,
                        textAlign: 'center'
                      }}
                    >
                      {option.icon}
                      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                        {option.title}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 3, bgcolor: 'background.paper', flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Get Started
                        </Typography>
                        <ArrowForwardIcon fontSize="small" sx={{ ml: 1 }} />
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item key={index} xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                      width: 80,
                      height: 80,
                      mb: 2,
                      mx: 'auto'
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Ready to Transform Your School?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Join thousands of educators revolutionizing education management
          </Typography>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SignupIcon />}
              onClick={() => navigate('/register')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                bgcolor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Request Demo
            </Button>
          </Stack>
        </Container>
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Home;