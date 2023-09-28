import React from 'react';
import { useUserQuery } from '../../pages/user/query.generated';
import { Box, Alert } from '@mui/material';
import AuthSuccessStatusPresenter from './AuthStatusPresenter';

export default function AuthStatusContainer() {
  const query = useUserQuery();
  const user = query.data?.user;

  return (
    <Box my={4}>
      {user ? (
        <AuthSuccessStatusPresenter user={user} />
      ) : (
        <Alert severity="warning">User is not authenticated</Alert>
      )}
    </Box>
  );
}
