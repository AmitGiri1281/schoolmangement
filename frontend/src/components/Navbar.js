import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { School as SchoolIcon } from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                textDecoration: 'none',
              }}
            >
              EduManagePro
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={RouterLink} to="/features" onClick={handleClose}>
                  Features
                </MenuItem>
                <MenuItem component={RouterLink} to="/pricing" onClick={handleClose}>
                  Pricing
                </MenuItem>
                <MenuItem component={RouterLink} to="/about" onClick={handleClose}>
                  About
                </MenuItem>
                <MenuItem component={RouterLink} to="/contact" onClick={handleClose}>
                  Contact
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                <Button
                  component={RouterLink}
                  to="/features"
                  sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                  Features
                </Button>
                <Button
                  component={RouterLink}
                  to="/pricing"
                  sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                  Pricing
                </Button>
                <Button
                  component={RouterLink}
                  to="/about"
                  sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                  About
                </Button>
                <Button
                  component={RouterLink}
                  to="/contact"
                  sx={{ color: 'text.primary', fontWeight: 500 }}
                >
                  Contact
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;