// pages/user/[id].tsx
import UserInfo from '../../organisms/UserInfo/UserInfo';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import { TrustScoreDisplay } from '../../components/TrustScore';

import { useRouter } from 'next/router';
import React from 'react';
import { useBooksQuery } from '../book/query.generated';
import { useBooksByUserIdQuery, useUserQuery } from './query.generated';

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = typeof id === 'string' ? id : undefined;
  
  const booksByUserIdQuery = useBooksByUserIdQuery({
    variables: {
      userId: stringId || ''
    },
    skip: !stringId
  })
  
  if (!stringId) {
    return <div>Loading...</div>;
  }
  const booksByUserId = booksByUserIdQuery.data?.booksByUserId
  const user = booksByUserIdQuery.data?.booksByUserId[0]?.user
  const isAuthenticated = !!user;

  return (
    <Container sx={{ bgcolor: 'black', width: '100%', minHeight: '100vh', margin: 0 }}>
      {user && (
        <UserInfo user={user} isAuthenticated={isAuthenticated}/>
      )}
      
      {user && (
        <Box py={2}>
          <Card variant="outlined" style={{ marginBottom: '20px' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <Typography variant="h6" gutterBottom>
                    信頼スコア
                  </Typography>
                  <TrustScoreDisplay
                    score={user.trustScore || 5.0}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => router.push(`/user/${stringId}/trust`)}
                    sx={{ mb: 1 }}
                  >
                    信頼スコア詳細
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => router.push(`/user/${stringId}/exchange-history`)}
                    sx={{ mb: 1 }}
                  >
                    交換履歴
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => router.push(`/user/${stringId}/achievements`)}
                  >
                    実績バッジ
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
      
      <Box py={3}>
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
