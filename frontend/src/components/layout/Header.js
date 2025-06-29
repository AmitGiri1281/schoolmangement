import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
  Button,
  Chip,
  styled,
  useTheme,
  useMediaQuery,
  InputBase,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Search as SearchIcon,
  AccountCircle,
  Settings,
  Logout,
  Close as CloseIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  School,
} from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styled Components
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({ drawerWidth = 240, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const { user, isAuthenticated, role } = useSelector((state) => state.auth);
  const unreadCount = useSelector((state) => state.notifications?.unreadCount || 0);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
    handleMenuClose();
  };

  const handleLogin = () => navigate('/login');
  const handleSignup = () => navigate('/register');
  const handleProfile = () => {
    navigate('/profile');
    handleMenuClose();
  };
  const handleNotifications = () => navigate('/notifications');

  // Memoized menu components
  const renderMenu = useMemo(() => (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem disabled>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>
          {user?.firstName?.[0] || 'U'}
        </Avatar>
        <Box>
          <Typography variant="body1">
            {user?.firstName || 'User'} {user?.lastName || ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email || 'admin@edumanagepro.com'}
          </Typography>
          <Chip 
            label={role?.toUpperCase() || 'GUEST'} 
            size="small" 
            sx={{ 
              mt: 0.5,
              bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
              color: 'white'
            }}
          />
        </Box>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <AccountCircle fontSize="small" />
        </ListItemIcon>
        My Profile
      </MenuItem>
      {role === 'admin' && (
        <MenuItem onClick={() => navigate('/admin')}>
          <ListItemIcon>
            <School fontSize="small" />
          </ListItemIcon>
          Admin Panel
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  ), [anchorEl, isMenuOpen, user, role, theme]);

  const renderMobileMenu = useMemo(() => (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotifications}>
        <IconButton size="large" color="inherit">
          <StyledBadge badgeContent={unreadCount} color="error" invisible={unreadCount === 0}>
            <NotificationsIcon />
          </StyledBadge>
        </IconButton>
        <Typography>Notifications</Typography>
      </MenuItem>
      {isMobile && (
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Dashboard</Typography>
        </MenuItem>
      )}
      {isAuthenticated ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton size="large" color="inherit">
            <Avatar sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}>
              {user?.firstName?.[0] || 'U'}
            </Avatar>
          </IconButton>
          <Typography>Profile</Typography>
        </MenuItem>
      ) : (
        <>
          <MenuItem onClick={handleLogin}>
            <IconButton size="large" color="inherit">
              <LoginIcon />
            </IconButton>
            <Typography>Login</Typography>
          </MenuItem>
          <MenuItem onClick={handleSignup}>
            <IconButton size="large" color="inherit">
              <SignupIcon />
            </IconButton>
            <Typography>Sign Up</Typography>
          </MenuItem>
        </>
      )}
    </Menu>
  ), [mobileMoreAnchorEl, isMobileMenuOpen, unreadCount, isMobile, isAuthenticated, user]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: 'background.default',
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(8px)',
        transition: theme.transitions.create(['background-color', 'box-shadow']),
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {!searchOpen && (
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' }, 
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            EduManagePro
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {searchOpen ? (
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                autoFocus
              />
            </Search>
            <IconButton 
              color="inherit" 
              onClick={handleSearchToggle}
              aria-label="close search"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleSearchToggle}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>

              <IconButton 
                size="large" 
                color="inherit"
                onClick={handleNotifications}
                aria-label="notifications"
              >
                <StyledBadge 
                  badgeContent={unreadCount} 
                  color="error"
                  invisible={unreadCount === 0}
                >
                  <NotificationsIcon />
                </StyledBadge>
              </IconButton>

              {isAuthenticated ? (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar sx={{ bgcolor: deepPurple[500], width: 32, height: 32 }}>
                    {user?.firstName?.[0] || 'U'}
                  </Avatar>
                </IconButton>
              ) : (
                <>
                  <Button
                    color="inherit"
                    startIcon={<LoginIcon />}
                    onClick={handleLogin}
                    sx={{ mx: 1 }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SignupIcon />}
                    onClick={handleSignup}
                    sx={{ mx: 1 }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                color="inherit"
                onClick={handleSearchToggle}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls="primary-search-account-menu-mobile"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>

      {renderMobileMenu}
      {renderMenu}
    </AppBar>
  );
};

Header.propTypes = {
  drawerWidth: PropTypes.number,
  handleDrawerToggle: PropTypes.func.isRequired,
};

Header.defaultProps = {
  drawerWidth: 240,
};

export default React.memo(Header);