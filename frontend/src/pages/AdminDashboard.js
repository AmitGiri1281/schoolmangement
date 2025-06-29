import React, { useState } from 'react';
import '../styles/AdminDashboard.css'; 
import {
  Box,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Badge // Added Badge import
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  Assessment as ReportsIcon, // This is the correct icon import
  Notifications as NotificationsIcon,
  AccountCircle as AccountIcon,
  MoreVert as MoreIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register ChartJS components
ChartJS.register(...registerables);

const AdminDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Sample data for charts
  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Attendance %',
        data: [92, 95, 90, 94, 96],
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4
      }
    ]
  };

  const feeStatusData = {
    labels: ['Paid', 'Partial', 'Pending'],
    datasets: [
      {
        data: [65, 15, 20],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ]
      }
    ]
  };

  // Recent activities data
  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Registered', time: '2 hours ago' },
    { id: 2, user: 'Sarah Smith', action: 'Updated profile', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'Paid fees', time: '1 day ago' },
    { id: 4, user: 'Emily Wilson', action: 'Submitted assignment', time: '2 days ago' }
  ];

  // Upcoming events
  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2023-06-15' },
    { id: 2, title: 'Sports Day', date: '2023-06-20' },
    { id: 3, title: 'Final Exams Begin', date: '2023-06-25' }
  ];

  const StatCard = ({ title, value, change, icon, loading = false }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {value}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
            {icon}
          </Avatar>
        </Box>
        {change && (
          <Box display="flex" alignItems="center" mt={1}>
            {change > 0 ? (
              <ArrowUpIcon color="success" fontSize="small" />
            ) : (
              <ArrowDownIcon color="error" fontSize="small" />
            )}
            <Typography
              variant="body2"
              color={change > 0 ? 'success.main' : 'error.main'}
              sx={{ ml: 0.5 }}
            >
              {Math.abs(change)}% from last week
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // Dashboard
        return (
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Students"
                value="1,245"
                change={2.5}
                icon={<PeopleIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Total Teachers"
                value="48"
                change={0}
                icon={<SchoolIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Pending Fees"
                value="$12,450"
                change={-1.8}
                icon={<ReportsIcon />} // Changed from AssessmentIcon to ReportsIcon
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Today's Attendance"
                value="92%"
                change={0.5}
                icon={<EventIcon />}
              />
            </Grid>

            {/* Rest of your component remains the same... */}

          </Grid>
        );
      case 1: // Students
        return <div>Student Management Content</div>;
      case 2: // Teachers
        return <div>Teacher Management Content</div>;
      case 3: // Reports
        return <div>Reports Content</div>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        bgcolor: 'background.paper',
        boxShadow: 1
      }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Admin Dashboard
        </Typography>
        <Box>
          <IconButton size="large" sx={{ mr: 1 }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            onClick={handleMenuClick}
          >
            <AccountIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Rest of your component... */}
    </Box>
  );
};

export default AdminDashboard;