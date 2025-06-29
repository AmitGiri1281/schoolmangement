// src/pages/Exams.js

import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
} from '@mui/material';

const exams = [
  { id: 1, subject: 'Mathematics', date: '2025-07-10', status: 'Scheduled' },
  { id: 2, subject: 'Physics', date: '2025-07-12', status: 'Completed' },
  { id: 3, subject: 'Chemistry', date: '2025-07-15', status: 'Scheduled' },
  { id: 4, subject: 'English', date: '2025-07-17', status: 'Pending' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Scheduled':
      return 'info';
    case 'Completed':
      return 'success';
    case 'Pending':
      return 'warning';
    default:
      return 'default';
  }
};

const Exams = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Exams
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.id}</TableCell>
                <TableCell>{exam.subject}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>
                  <Chip
                    label={exam.status}
                    color={getStatusColor(exam.status)}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Exams;
