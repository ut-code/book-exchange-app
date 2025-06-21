import { Container, Typography, Box, Divider, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import SigninUser from '../../organisms/Signin/SigninUserContainer';
import SignupUser from '../../organisms/Signup/SignupUser';
import SignoutUser from '../../organisms/Signout/SignoutUser';
import { useUserQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButtonPresenter';

const UserPage = () => {
  const {data, refetch} = useUserQuery();
  const user = data?.user;
  const router = useRouter();

  return (
    <Container sx={{ bgcolor: 'black', width: '70%'}}>
      <Box mt={0} pt={2} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary"
          disabled={!user}
          onClick={() => router.push('/book')} 
        >
          Home
        </Button>
      </Box>
      {!user && (
        <Box mt={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            ユーザー
          </Typography>
           <Box mt={3}>
            <SigninUser refetchUser={refetch}/>
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
            <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'white', mb: 3 }}>
              ユーザー機能
            </Typography>
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
              <Button 
                variant="outlined"
                onClick={() => router.push('/user/Users')}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'gray',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                全ユーザー一覧
              </Button>
              <Button 
                variant="outlined"
                onClick={() => router.push('/user/me')}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'gray',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                マイプロフィール
              </Button>
            </Stack>
          </Box>
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