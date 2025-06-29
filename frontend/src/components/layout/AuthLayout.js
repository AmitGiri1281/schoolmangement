// src/components/layout/AuthLayout.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3f51b5 0%, #f50057 100%)',
        p: 2
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: { xs: '100%', sm: 400 },
            borderRadius: 2
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ mb: 4, fontWeight: 700 }}
          >
            {title}
          </Typography>
          {children}
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AuthLayout;