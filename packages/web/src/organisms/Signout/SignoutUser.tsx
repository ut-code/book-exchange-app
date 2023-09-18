import React, { useState } from 'react';
import { useUserQuery, useUsersQuery } from '../../pages/user/query.generated';
import { Button, TextField, Typography, List, ListItem, Divider } from '@mui/material';
import AuthStatus from '../AuthStatus/AuthStatus';

export default function SignoutUser() {
  const query = useUserQuery();
  const user = query.data?.user;
  
  const handleSignout = async () => {
    try {
      localStorage.removeItem('accessToken');
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <AuthStatus/>
        <Button variant="contained" color="primary" onClick={handleSignout}>
          Signout
        </Button>
    </div>
  );
}
