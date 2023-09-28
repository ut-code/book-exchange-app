import React from 'react';
import { useDeleteUserMutation, useUserQuery } from '../../pages/user/query.generated';
import { Button } from '@mui/material';
import AuthStatus from '../AuthStatus/AuthStatusContainer';

export default function DeleteAccount() {
  const [deleteUser] = useDeleteUserMutation();
  
  const handleDeleteUser = async () => {
    try {
      localStorage.removeItem('accessToken');
      await deleteUser();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <AuthStatus/>
        <Button variant="outlined" color="secondary" onClick={handleDeleteUser}>
          Delete Account
        </Button>
    </div>
  );
}
