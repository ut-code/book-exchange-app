// pages/user/[id].tsx
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Link,
  Button,
  Snackbar,
  IconButton,
} from '@mui/material';

import { useRouter } from 'next/router';
import React from 'react';
import { use, useState } from 'react';
import { useBooksQuery } from '../book/query.generated';
import { useBooksByUserIdQuery, useUserQuery } from './query.generated';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = typeof id === 'string' ? id : undefined;
  
  if (!stringId) {
    return <div>Loading...</div>;
  }

  const query = useUserQuery();
  const user = query.data?.user;

  const booksQuery = useBooksQuery()
  const books = booksQuery.data?.books

  const booksByUserIdQuery = useBooksByUserIdQuery({
    variables: {
      userId: stringId
    }
  })
  const booksByUserId = booksByUserIdQuery.data?.booksByUserId
  const link = `localhost:3000/user/${user?.id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
    alert('リンクをコピーできました. 本を貸し借りしたい友達にリンクをシェアしよう!')
  }


  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          ユーザー: {user?.username}
        </Typography>
 
        {booksByUserId?.map((book) => (
          <Card key={book.id} variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="body1">{book.description}</Typography>
            </CardContent>
          </Card>
        ))}

        <Button onClick={copyToClipboard} variant="contained" color="primary">Copy Link</Button>
        <Typography mt={2}>君の持っている本一覧を友達にシェアしよう</Typography>
        
      </Box>
    </Container>
  );
};

export default UserProfile;
