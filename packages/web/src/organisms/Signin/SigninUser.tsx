import React, { useState } from 'react';
import { useSigninUserMutation, useUsersQuery } from '../../pages/user/query.generated';
import { Button, TextField, Typography, List, ListItem, Divider } from '@mui/material';

export default function SigninUser() {
  const { data } = useUsersQuery();
  const [signinUser] = useSigninUserMutation();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    try {
      const response = await signinUser({
        variables: {
          signinUserInput: {
            username: name,
            password,
          },
        },
      });
      alert('signin success');
      localStorage.setItem('accessToken', response.data?.signinUser.accessToken ?? '');
      // TODO: Redirect to home page

    } catch (error) {
      alert('Error:' + error);
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignin}>
        Signin
      </Button>
    </div>
  );
}
