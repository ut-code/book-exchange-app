import React from 'react';
import { useUsersQuery } from './query.generated';
import { Typography, Box, Button, Card, CardContent, Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Person } from '@mui/icons-material';
import { AppLayout } from '../../components/Layout';

const Users = () => {
  const { data } = useUsersQuery();
  const router = useRouter();

  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: 'ユーザー', href: '/user' },
    { label: '全ユーザー一覧' },
  ];

  return (
    <AppLayout title="全ユーザー一覧" breadcrumbs={breadcrumbs} showBackButton>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => router.push('/book')}
          >
            本の管理
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/user')}
          >
            ユーザーページ
          </Button>
        </Stack>
      </Box>

      <Box>
        {data?.users?.map((user) => (
          <Card 
            key={user.id}
            sx={{ 
              mb: 2, 
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 3
              }
            }}
            onClick={() => router.push(`/user/${user.id}`)}
          >
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar>
                  <Person />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {user.id}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </AppLayout>
  );
}

export default Users;