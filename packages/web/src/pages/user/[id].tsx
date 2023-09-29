// pages/user/[id].tsx
import UserInfo from '../../organisms/UserInfo/UserInfo';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';

import { useRouter } from 'next/router';
import React from 'react';
import { useBooksQuery } from '../book/query.generated';
import { useBooksByUserIdQuery, useUserQuery } from './query.generated';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = typeof id === 'string' ? id : undefined;
  
  if (!stringId) {
    return <div>Loading...</div>;
  }

  const booksByUserIdQuery = useBooksByUserIdQuery({
    variables: {
      userId: stringId
    }
  })
  const booksByUserId = booksByUserIdQuery.data?.booksByUserId
  const user = booksByUserIdQuery.data?.booksByUserId[0]?.user

  return (
    <Container>
      {user && (
        <UserInfo user={user} isAuthenticated={false}/>
      )}
      <Box my={3}>
        {booksByUserId?.map((book) => (
          <Card key={book.id} variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h6">{book.title}</Typography>
              <Typography variant="body1">{book.description}</Typography>
            </CardContent>
          </Card>
        ))}
        {user && booksByUserId && 
          <Typography variant="h6" component="h1" gutterBottom>
            {user.username} さんは{booksByUserId.length}冊の本を持っています
          </Typography>
        }
        {user && booksByUserId && booksByUserId.length === 0 && 
          <Typography variant="h6" component="h1" gutterBottom>
            {user.username} さんは本を持っていません
          </Typography>
        }
        {/* <SigninUser/> */}
      </Box>
    </Container>
  );
};

export default UserProfile;
