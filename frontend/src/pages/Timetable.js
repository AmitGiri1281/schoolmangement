// src/pages/Timetable.js

import React from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Chip,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';

const timetable = [
  { day: 'Monday', slots: ['Math', 'English', 'Physics', 'Break', 'Computer'] },
  { day: 'Tuesday', slots: ['Biology', 'Math', 'Chemistry', 'Break', 'Sports'] },
  { day: 'Wednesday', slots: ['Physics', 'Computer', 'English', 'Break', 'Art'] },
  { day: 'Thursday', slots: ['History', 'Math', 'Physics', 'Break', 'Biology'] },
  { day: 'Friday', slots: ['Chemistry', 'English', 'Computer', 'Break', 'Library'] },
];

const Timetable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Weekly Timetable
      </Typography>

      {isMobile ? (
        // 🟦 Responsive Card layout for mobile
        <Grid container spacing={2}>
          {timetable.map((row, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {row.day}
                  </Typography>
                  {row.slots.map((subject, idx) => (
                    <Box key={idx} display="flex" alignItems="center" mb={1}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 'bold', width: '90px' }}
                      >
                        {subject === 'Break' ? `Break` : `Period ${idx + 1}`}
                      </Typography>
                      <Chip
                        label={subject}
                        color={subject === 'Break' ? 'info' : 'primary'}
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // 🟩 Table layout for desktop
        <TableContainer component={Paper} sx={{ borderRadius: 3, mt: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Period 1</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Period 2</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Period 3</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Break</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Period 4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timetable.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.day}</TableCell>
                  {row.slots.map((subject, idx) => (
                    <TableCell align="center" key={idx}>
                      {subject === 'Break' ? (
                        <Chip label="Break" color="info" variant="outlined" />
                      ) : (
                        <Typography>{subject}</Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Timetable;
