import React from 'react';
import { Button, TextField, Box } from '@mui/material';

export type SignupUserPresenterProps = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSignin: () => Promise<void>;
  isDisabled: boolean;
};

export default function SigninUserPresenter({name, setName, password, setPassword, handleSignin, isDisabled}: SignupUserPresenterProps) {
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
      <Box mt={1.5}>
        <Button disabled={isDisabled} variant="contained" color="primary" onClick={handleSignin}>
          Signin
        </Button>
      </Box>

    </div>
  );
}
