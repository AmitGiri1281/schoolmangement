import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Skeleton,
  useTheme,
  IconButton,
  Tooltip,
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Tab,
  Tabs,
  Card,
  CardContent,
  CardHeader,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Notifications as NotificationsIcon,
  Event as EventIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  AttachMoney as FeeIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreIcon,
  TrendingUp as TrendingIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { getDashboardStats } from '../features/dashboard/dashboardSlice';
import { motion } from 'framer-motion';
import { format, parseISO, isToday, isThisWeek } from 'date-fns';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const StatCard = ({ title, value, icon, change, loading, onClick }) => {
  const theme = useTheme();
  const ChangeIndicator = () => {
    if (!change) return null;
    const isPositive = change >= 0;
    return (
      <Chip
        size="small"
        label={`${isPositive ? '+' : ''}${change}%`}
        sx={{
          ml: 1,
          backgroundColor: isPositive ? theme.palette.success.light : theme.palette.error.light,
          color: isPositive ? theme.palette.success.dark : theme.palette.error.dark
        }}
        icon={<TrendingIcon fontSize="small" sx={{
          transform: isPositive ? 'none' : 'rotate(180deg)'
        }} />}
      />
    );
  };

  return (
    <motion.div whileHover={{ y: -2 }} onClick={onClick}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          height: '100%',
          borderRadius: 3,
          background: theme.palette.background.paper,
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: theme.shadows[6]
          }
        }}
      >
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar sx={{
            bgcolor: theme.palette.primary.light,
            color: theme.palette.primary.main,
            mr: 2,
            width: 40,
            height: 40
          }}>
            {icon}
          </Avatar>
          <Typography variant="subtitle1" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Box display="flex" alignItems="baseline">
          {loading ? (
            <Skeleton variant="text" width="60%" height={40} />
          ) : (
            <>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {value}
              </Typography>
              <ChangeIndicator />
            </>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

const ActivityItem = ({ activity, index }) => {
  const theme = useTheme();
  const getActivityIcon = () => {
    switch(activity.type) {
      case 'attendance':
        return <ScheduleIcon color="primary" />;
      case 'fee':
        return <FeeIcon color="secondary" />;
      case 'exam':
        return <AssignmentIcon color="warning" />;
      default:
        return <SchoolIcon color="info" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <ListItem sx={{ px: 0 }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: theme.palette.background.default }}>
            {getActivityIcon()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={activity.title}
          secondary={format(parseISO(activity.date), 'PPp')}
          primaryTypographyProps={{ fontWeight: 500 }}
        />
        <Chip
          label={activity.status}
          size="small"
          sx={{
            backgroundColor: activity.status === 'Completed' 
              ? theme.palette.success.light 
              : theme.palette.warning.light,
            color: activity.status === 'Completed' 
              ? theme.palette.success.dark 
              : theme.palette.warning.dark
          }}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </motion.div>
  );
};

const EventItem = ({ event, index }) => {
  const theme = useTheme();
  const isUpcoming = new Date(event.date) > new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card sx={{ mb: 2, boxShadow: theme.shadows[1] }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <EventIcon />
            </Avatar>
          }
          action={
            <IconButton>
              <MoreIcon />
            </IconButton>
          }
          title={event.title}
          subheader={format(parseISO(event.date), 'PPP')}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary">
            {event.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Chip
              label={isUpcoming ? 'Upcoming' : 'Past'}
              size="small"
              sx={{
                backgroundColor: isUpcoming 
                  ? theme.palette.info.light 
                  : theme.palette.grey[300],
                color: isUpcoming 
                  ? theme.palette.info.dark 
                  : theme.palette.grey[700]
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const studentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance %',
        data: [92, 88, 95, 90, 93, 96],
        backgroundColor: theme.palette.primary.main,
        borderRadius: 4
      }
    ],
  };

  const feeData = {
    labels: ['Tuition', 'Library', 'Sports', 'Transport', 'Other'],
    datasets: [
      {
        label: 'Fee Breakdown',
        data: [5000, 1000, 500, 2000, 500],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.warning.main,
          theme.palette.success.main,
          theme.palette.info.main,
        ],
        borderWidth: 1
      },
    ],
  };

  const performanceData = {
    labels: ['Math', 'Science', 'History', 'English', 'Arts'],
    datasets: [
      {
        label: 'Your Scores',
        data: [85, 90, 78, 92, 88],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      },
      {
        label: 'Class Average',
        data: [72, 76, 68, 78, 75],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.4
      }
    ]
  };

  const activities = [
    {
      id: 1,
      title: 'Math Class Attendance',
      date: new Date().toISOString(),
      type: 'attendance',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Quarterly Fee Payment',
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'fee',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Science Exam Results',
      date: new Date(Date.now() - 172800000).toISOString(),
      type: 'exam',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      date: new Date(Date.now() - 259200000).toISOString(),
      type: 'meeting',
      status: 'Completed'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: new Date(Date.now() + 86400000 * 3).toISOString(),
      description: 'All students must participate in at least one event'
    },
    {
      id: 2,
      title: 'Science Fair',
      date: new Date(Date.now() + 86400000 * 7).toISOString(),
      description: 'Projects submission deadline is next Monday'
    },
    {
      id: 3,
      title: 'Final Exams Begin',
      date: new Date(Date.now() + 86400000 * 14).toISOString(),
      description: 'Check the exam schedule on the notice board'
    }
  ];

  if (loading && !stats) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">Error loading dashboard data: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Welcome, {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {isToday(new Date()) ? "Here's what's happening today" : "Here's your dashboard overview"}
          </Typography>
        </Box>
        <Box>
          <Tooltip title="Notifications">
            <IconButton sx={{ mr: 1 }}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
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

      {/* Statistic Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats?.totalStudents?.toLocaleString() || '0'}
            icon={<SchoolIcon />}
            change={2.5}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Teachers"
            value={stats?.totalTeachers?.toLocaleString() || '0'}
            icon={<PeopleIcon />}
            change={0}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Attendance"
            value={`${stats?.todayAttendance?.toFixed(1) || 0}%`}
            icon={<ScheduleIcon />}
            change={-1.2}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Fee Collection"
            value={`${stats?.feeCollection?.toFixed(1) || 0}%`}
            icon={<FeeIcon />}
            change={5.8}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Main Content Area */}
      {user?.role === 'student' || user?.role === 'parent' ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
                <Tab label="Attendance" />
                <Tab label="Performance" />
                <Tab label="Activities" />
              </Tabs>
              {tabValue === 0 && (
                <Box sx={{ height: 400 }}>
                  <Bar
                    data={studentData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw}%`
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            callback: (value) => `${value}%`
                          }
                        }
                      }
                    }}
                  />
                </Box>
              )}
              {tabValue === 1 && (
                <Box sx={{ height: 400 }}>
                  <Line
                    data={performanceData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { position: 'top' }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          ticks: {
                            callback: (value) => `${value}%`
                          }
                        }
                      }
                    }}
                  />
                </Box>
              )}
              {tabValue === 2 && (
                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                  {activities.map((activity, index) => (
                    <ActivityItem key={activity.id} activity={activity} index={index} />
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Fee Breakdown
              </Typography>
              <Box sx={{ height: 300, mb: 3 }}>
                <Pie
                  data={feeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'bottom' },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: $${value} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
              <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Upcoming Events
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {events.filter(event => isThisWeek(parseISO(event.date))).map((event, index) => (
                  <EventItem key={event.id} event={event} index={index} />
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                School Overview
              </Typography>
              <Box sx={{ height: 400 }}>
                <Bar
                  data={{
                    labels: ['Students', 'Teachers', 'Classes', 'Activities'],
                    datasets: [
                      {
                        label: 'Current Count',
                        data: [
                          stats?.totalStudents || 0,
                          stats?.totalTeachers || 0,
                          stats?.totalClasses || 0,
                          stats?.totalActivities || 0
                        ],
                        backgroundColor: theme.palette.primary.main
                      },
                      {
                        label: 'Previous Month',
                        data: [
                          (stats?.totalStudents || 0) * 0.9,
                          (stats?.totalTeachers || 0) * 0.95,
                          (stats?.totalClasses || 0) * 0.85,
                          (stats?.totalActivities || 0) * 0.8
                        ],
                        backgroundColor: theme.palette.secondary.main
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top' }
                    }
                  }}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Recent Activities
              </Typography>
              <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                {activities.map((activity, index) => (
                  <ActivityItem key={activity.id} activity={activity} index={index} />
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;