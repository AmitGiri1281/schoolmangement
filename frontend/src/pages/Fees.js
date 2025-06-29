// src/pages/Fees.js

import React from 'react';
import {
  Container,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

const feesData = [
  {
    id: 1,
    studentName: 'Amit Giri',
    amount: 15000,
    status: 'Paid',
    dueDate: '2025-06-10',
  },
  {
    id: 2,
    studentName: 'Riya Sharma',
    amount: 15000,
    status: 'Unpaid',
    dueDate: '2025-06-20',
  },
  {
    id: 3,
    studentName: 'Rahul Mehta',
    amount: 15000,
    status: 'Partial',
    dueDate: '2025-06-18',
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Paid':
      return 'success';
    case 'Unpaid':
      return 'error';
    case 'Partial':
      return 'warning';
    default:
      return 'default';
  }
};

const Fees = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Student Fees Status
      </Typography>

      {isMobile ? (
        // Responsive cards for mobile
        <Grid container spacing={2}>
          {feesData.map((fee) => (
            <Grid item xs={12} key={fee.id}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6">{fee.studentName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {fee.id}
                  </Typography>
                  <Typography variant="body1">
                    Amount: ₹{fee.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="body1">Due: {fee.dueDate}</Typography>
                  <Chip
                    label={fee.status}
                    color={getStatusColor(fee.status)}
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Table for desktop/tablets
        <TableContainer component={Paper} sx={{ borderRadius: 3, mt: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Amount (₹)</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feesData.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.id}</TableCell>
                  <TableCell>{fee.studentName}</TableCell>
                  <TableCell>₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={fee.status}
                      color={getStatusColor(fee.status)}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          * Please contact the admin office in case of any fee discrepancy.
        </Typography>
      </Box>
    </Container>
  );
};

export default Fees;
