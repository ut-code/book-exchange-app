import { Typography, Box, Divider, Button, Stack, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import SigninUser from '../../organisms/Signin/SigninUserContainer';
import SignupUser from '../../organisms/Signup/SignupUser';
import SignoutUser from '../../organisms/Signout/SignoutUser';
import { useUserQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButtonPresenter';
import { AppLayout } from '../../components/Layout';

const UserPage = () => {
  const {data, refetch} = useUserQuery();
  const user = data?.user;
  const router = useRouter();

  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: 'プロフィール' },
  ];

  return (
    <AppLayout title="プロフィール" breadcrumbs={breadcrumbs}>
      {!user && (
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            ユーザー認証
          </Typography>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  サインイン
                </Typography>
                <SigninUser refetchUser={refetch}/>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  新規ユーザー登録
                </Typography>
                <SignupUser />
              </CardContent>
            </Card>
          </Stack>
        </Box>
      )}
      {user && (
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            プロフィール
          </Typography>
          
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  プロフィール管理
                </Typography>
                <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                  <Button 
                    variant="contained"
                    onClick={() => router.push('/user/me')}
                  >
                    マイプロフィール
                  </Button>
                </Stack>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  設定
                </Typography>
                <Stack spacing={2}>
                  <ShareLinkButton isDisabled={false} user={user}/>
                  <Box>
                    <SignoutUser/>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      )}
    </AppLayout>
  );
}

export default UserPage;