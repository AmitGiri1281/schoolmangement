import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  useTheme,
  IconButton
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              EduManagePro
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The next-generation school management platform powered by AI.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link component={RouterLink} to="/features" color="text.secondary" sx={{ mb: 1 }}>
                Features
              </Link>
              <Link component={RouterLink} to="/pricing" color="text.secondary" sx={{ mb: 1 }}>
                Pricing
              </Link>
              <Link component={RouterLink} to="/about" color="text.secondary" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="text.secondary">
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link component={RouterLink} to="/privacy" color="text.secondary" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/terms" color="text.secondary" sx={{ mb: 1 }}>
                Terms of Service
              </Link>
              <Link component={RouterLink} to="/cookies" color="text.secondary">
                Cookie Policy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton aria-label="Facebook" component="a" href="https://facebook.com">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" component="a" href="https://twitter.com">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" component="a" href="https://instagram.com">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" component="a" href="https://linkedin.com">
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="GitHub" component="a" href="https://github.com">
                <GitHubIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              support@edumanagepro.com
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} EduManagePro. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;