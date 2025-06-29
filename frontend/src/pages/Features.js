import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, useTheme } from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Schedule as ScheduleIcon,
  LibraryBooks as LibraryIcon,
  Payment as PaymentIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Features = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <SchoolIcon fontSize="large" color="primary" />,
      title: "Student Management",
      description: "Comprehensive student profiles with academic history, attendance records, and performance analytics."
    },
    {
      icon: <PeopleIcon fontSize="large" color="primary" />,
      title: "Teacher Portal",
      description: "Dedicated space for teachers to manage classes, assignments, and student evaluations."
    },
    {
      icon: <AssessmentIcon fontSize="large" color="primary" />,
      title: "Gradebook",
      description: "Automated grade calculation with customizable grading scales and report generation."
    },
    {
      icon: <ScheduleIcon fontSize="large" color="primary" />,
      title: "Timetable Scheduling",
      description: "Dynamic scheduling system with conflict detection and room allocation."
    },
    {
      icon: <LibraryIcon fontSize="large" color="primary" />,
      title: "Library Management",
      description: "Digital catalog system with book tracking, reservations, and late fee calculations."
    },
    {
      icon: <PaymentIcon fontSize="large" color="primary" />,
      title: "Fee Management",
      description: "Automated billing, payment tracking, and financial reporting for tuition and other fees."
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: "Role-Based Access",
      description: "Secure access control with different permission levels for admins, teachers, students, and parents."
    },
    {
      icon: <DevicesIcon fontSize="large" color="primary" />,
      title: "Multi-Device Support",
      description: "Fully responsive design that works on desktops, tablets, and mobile devices."
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            fontWeight: 700,
            mb: 6,
            color: theme.palette.text.primary
          }}
        >
          Powerful Features
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            mb: 8,
            color: theme.palette.text.secondary
          }}
        >
          Everything you need to manage your educational institution efficiently
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6]
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{
                      textAlign: 'center',
                      fontWeight: 600,
                      color: theme.palette.text.primary
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      color: theme.palette.text.secondary
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Ready to transform your school management?
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;