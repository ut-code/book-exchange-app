import { Container, Typography, Box, Divider, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import SigninUser from '../../organisms/Signin/SigninUser';
import SignupUser from '../../organisms/Signup/SignupUser';
import SignoutUser from '../../organisms/Signout/SignoutUser';
import { useUserQuery } from './query.generated';

const UserPage = () => {
  const query = useUserQuery();
  const user = query.data?.user;
  const router = useRouter();

  return (
    <Container sx={{ bgcolor: 'black'}}>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => router.push('/')} 
        >
          Go to Books Page
        </Button>
      </Box>
      {!user && (
        <Box mt={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            ユーザー
          </Typography>
          {/* <AuthStatus /> */}
          <Box mt={3}>
            <SignupUser />
          </Box>
          <Divider variant="middle" style={{ margin: '20px 0' }} />
          <Box mt={3}>
            <SigninUser />
          </Box>
        </Box>
      )}
      {user && (
        <Box>
          <Divider variant="middle" style={{ margin: '20px 0' }} />
          <Box my={2}>
            <SignoutUser/>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default UserPage;