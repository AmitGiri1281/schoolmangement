// src/components/layout/MainLayout.jsx

import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar isMobile={isMobile} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: isMobile ? 1 : 3,
          pt: 2,
          pb: 2,
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          overflowY: 'auto',
        }}
      >
        {/* Top Navbar */}
        <Navbar isMobile={isMobile} />
        
        {/* Page Content */}
        <Box mt={isMobile ? 2 : 3}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
