// src/pages/Library.js

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
} from '@mui/material';

const books = [
  {
    id: 1,
    title: 'Data Structures and Algorithms',
    author: 'Narasimha Karumanchi',
    available: true,
    issuedTo: null,
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    available: false,
    issuedTo: 'Amit Giri',
  },
  {
    id: 3,
    title: 'Introduction to Machine Learning',
    author: 'Ethem Alpaydin',
    available: true,
    issuedTo: null,
  },
];

const Library = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Library Books
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Issued To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Chip
                    label={book.available ? 'Available' : 'Issued'}
                    color={book.available ? 'success' : 'warning'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {book.available ? '-' : book.issuedTo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2}>
        <Typography variant="body2" color="text.secondary">
          * Please return issued books within 15 days to avoid late fees.
        </Typography>
      </Box>
    </Container>
  );
};

export default Library;
