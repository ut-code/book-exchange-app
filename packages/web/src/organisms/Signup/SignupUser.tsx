import React, { useState } from 'react';
import { useSignupUserMutation, useUsersQuery } from '../../pages/user/query.generated';
import { Button, TextField, Typography, List, ListItem, Divider } from '@mui/material';

export default function SignupUser() {
  const { data } = useUsersQuery();
  const [signupUser] = useSignupUserMutation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await signupUser({
        variables: {
          createUserInput: {
            username: name,
            password,
          },
        },
      });
    } catch (error) {
      console.error('Error:', error);
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
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Signup
        </Button>
    </div>
  );
}
