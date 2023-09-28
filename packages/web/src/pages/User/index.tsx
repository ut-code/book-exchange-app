import { Container, Typography, Box, Divider, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import SigninUser from '../../organisms/Signin/SigninUserContainer';
import SignupUser from '../../organisms/Signup/SignupUser';
import SignoutUser from '../../organisms/Signout/SignoutUser';
import { useUserQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButtonPresenter';

const UserPage = () => {
  const query = useUserQuery();
  const user = query.data?.user;
  const router = useRouter();

  return (
    <Container sx={{ bgcolor: 'black', width: '70%'}}>
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
           <Box mt={3}>
            <SigninUser />
          </Box>
          <Divider variant="middle" style={{ margin: '20px 0' }} />
          <Box mt={3}>
            <SignupUser />
          </Box>
        </Box>
      )}
      {user && (
        <Box>
          <Divider variant="middle" style={{ margin: '20px 0' }} />
          <Box my={2}>
            <SignoutUser/>
          </Box>
          <ShareLinkButton isDisabled={false} user={user}/>
        </Box>
      )}
    </Container>
  );
}

export default UserPage;