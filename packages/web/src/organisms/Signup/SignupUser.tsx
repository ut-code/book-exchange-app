import React, { useState } from 'react';
import { useSignupUserMutation, useUsersQuery } from '../../pages/user/query.generated';
import { Button, TextField, Typography, List, ListItem, Divider, Box, Snackbar } from '@mui/material';

export default function SignupUser() {
  const { data } = useUsersQuery();
  const [signupUser] = useSignupUserMutation();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

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

      // Signup was successful, show the success message
      setIsSignupSuccess(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    // Close the Snackbar when the user clicks the close button
    setIsSignupSuccess(false);
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
      <Box mt={1.5}>
        <Button variant="contained" color="primary" onClick={handleSignup}>
          Signup
        </Button>
      </Box>

      {/* Snackbar for Signup Success */}
      <Snackbar
        open={isSignupSuccess}
        autoHideDuration={4000} // Adjust the duration as needed
        onClose={handleCloseSnackbar}
        message="Signup succeeded!"
        // Add any additional props or styles to customize the Snackbar
      />
    </div>
  );
}
