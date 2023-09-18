import React from 'react';
import CreateBook from './CreateBook';
import { Typography, Card, CardContent, Divider, Container, Box } from '@mui/material';
import { BooksQuery } from './query.generated';

type BooksProps = {
  books: BooksQuery['books'];
}

const Books = (props: BooksProps) => {

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>

      {props.books.length > 0 ? (
        props.books.map((book) => (
          <Box key={book.id} mb={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">Title: {book.title}</Typography>
                <Typography variant="body1">Description: {book.description}</Typography>
              </CardContent>
            </Card>
            <Divider />
          </Box>
        ))
      ) : (
        <Typography variant="h6">No books</Typography>
      )}
    </>
  );
};

export default Books;
