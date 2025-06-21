import React from 'react';
import { useUsersQuery } from './query.generated';
import { Typography, List, ListItem, Divider, Container, Box, IconButton, Button, Card, CardContent, Avatar, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { ArrowBack, Person } from '@mui/icons-material';

const Users = () => {
  const { data } = useUsersQuery();
  const router = useRouter();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <IconButton
            onClick={() => router.push('/user')}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.05)'
              }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            全ユーザー一覧
          </Typography>
        </Stack>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => router.push('/book')}
            sx={{ borderRadius: 2 }}
          >
            本の管理
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/user')}
            sx={{ borderRadius: 2 }}
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
    </Container>
  );
}

export default Users;