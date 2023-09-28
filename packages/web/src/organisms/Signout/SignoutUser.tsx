import React from 'react';
import { useUserQuery } from '../../pages/user/query.generated';
import { Button } from '@mui/material';
import AuthStatus from '../AuthStatus/AuthStatusContainer';

export default function SignoutUser() {
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
        <Button variant="outlined" color="secondary" onClick={handleSignout}>
          Signout
        </Button>
    </div>
  );
}
