import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  AttachMoney as MoneyIcon,
  LibraryBooks as LibraryIcon,
  Assignment as AssignmentIcon,
  Person as PersonIcon,
  EventAvailable as CalendarIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      width: '70vw',
    },
  },
}));

const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '12px',
  margin: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Students', icon: <PeopleIcon />, path: '/students' },
    { text: 'Teachers', icon: <SchoolIcon />, path: '/teachers' },
    { text: 'Attendance', icon: <CalendarIcon />, path: '/attendance' },
    { text: 'Fees', icon: <MoneyIcon />, path: '/fees' },
    { text: 'Exams', icon: <AssignmentIcon />, path: '/exams' },
    { text: 'Library', icon: <LibraryIcon />, path: '/library' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={!isMobile}
      onClose={() => {}}
    >
      <Toolbar />
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <StyledListItem component={Link} to={path} key={text}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
