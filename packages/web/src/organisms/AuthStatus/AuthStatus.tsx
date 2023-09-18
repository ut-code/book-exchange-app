import React from 'react';
import { useUserQuery } from '../../pages/user/query.generated';
import { Typography, Box, Card, CardHeader, Avatar, CardContent, Alert } from '@mui/material';

export default function AuthStatus() {
  const query = useUserQuery();
  const user = query.data?.user;

  return (
    <Box my={4}>
      {user ? (
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar>{user.username.charAt(0)}</Avatar>
            }
            title={`Welcome, ${user.username}`}
            subheader="authenticated"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">User ID: {user.id}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Alert severity="warning">User is not authenticated</Alert>
      )}
    </Box>
  );
}
