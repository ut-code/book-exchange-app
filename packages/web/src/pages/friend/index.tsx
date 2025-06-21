import { Typography, Box, Button, Stack, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { AppLayout } from '../../components/Layout';
import { useUserQuery } from '../user/query.generated';

const FriendPage = () => {
  const { data } = useUserQuery();
  const user = data?.user;
  const router = useRouter();

  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: 'フレンド' },
  ];

  if (!user) {
    return (
      <AppLayout title="フレンド" breadcrumbs={breadcrumbs}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            フレンド機能
          </Typography>
          <Typography variant="body1" color="text.secondary">
            フレンド機能を利用するにはログインが必要です。
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => router.push('/user')}
            sx={{ mt: 2 }}
          >
            ログインページへ
          </Button>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="フレンド" breadcrumbs={breadcrumbs}>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          フレンド機能
        </Typography>
        
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                ユーザー管理
              </Typography>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Button 
                  variant="contained"
                  onClick={() => router.push('/user/Users')}
                >
                  全ユーザー一覧
                </Button>
              </Stack>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                フレンド機能（準備中）
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                友達リスト、友達申請、友達検索などの機能を追加予定です。
              </Typography>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Button 
                  variant="outlined"
                  disabled
                >
                  友達リスト
                </Button>
                <Button 
                  variant="outlined"
                  disabled
                >
                  友達申請
                </Button>
                <Button 
                  variant="outlined"
                  disabled
                >
                  友達検索
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </AppLayout>
  );
};

export default FriendPage;