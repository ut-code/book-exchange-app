// pages/user/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useBooksQuery } from './query.generated';
import { Typography, Card, CardContent, Container, Box } from '@mui/material';

const Book = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = typeof id === 'string' ? id : undefined;

  if (!stringId) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const booksQuery = useBooksQuery();
  const books = booksQuery.data?.books;

  return (
    <Container>
      <Box mt={2}>
        {books?.map((book) => (
          <Box key={book.id} m={2}>
            <Card>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body1">{book.description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Book;
