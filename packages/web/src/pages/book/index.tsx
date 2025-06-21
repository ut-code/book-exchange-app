import { Container, Divider, Box, Button, Stack, Typography } from '@mui/material';
import { useUserQuery } from '../user/query.generated';
import CreateBook from './CreateBook';
import { useBooksQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButtonPresenter';
import { useRouter } from 'next/router';
import UpdateBook from './EditBook';
import UserInfo from '../../organisms/UserInfo/UserInfo';
import { AccountCircle, Settings, LibraryBooks, People, BookmarkAdd, AdminPanelSettings } from '@mui/icons-material';

const BookProfile = () => {
  const query = useUserQuery();
  const user = query.data?.user;

  // network-only
  const {data, refetch} = useBooksQuery({
    fetchPolicy: 'network-only',
  });
  const books = data?.books ?? [];
  const reversedBooks = [...books].reverse();
  const router = useRouter();

  return (
    <Container sx={{ bgcolor: 'black', width: '100%', minHeight: '100vh' }}>
      <Stack pt={2} direction="row" justifyContent="space-between">
        {user && (
          <UserInfo user={user} isAuthenticated={true}/>
        )}
          <Button 
            color={user ? "primary" : "inherit"}
            disabled={!user}
            onClick={() => router.push('/user')} 
          >
            <AccountCircle sx={{color: user ? "gray" : "disabled"}}/>
          </Button>
      </Stack>
      {user && (
        <Box mt={4}>
          <Box mb={3}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              機能メニュー
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="outlined"
                startIcon={<LibraryBooks />}
                onClick={() => router.push('/book/templates')}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'gray',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                本のテンプレート一覧
              </Button>
              <Button
                variant="outlined"
                startIcon={<BookmarkAdd />}
                onClick={() => router.push('/book/want-to-read')}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'gray',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                読みたい本リスト
              </Button>
              <Button
                variant="outlined"
                startIcon={<People />}
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
                startIcon={<AdminPanelSettings />}
                onClick={() => router.push('/admin')}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'gray',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                管理画面
              </Button>
            </Stack>
          </Box>
          <Divider style={{margin: '16px 0'}}/>
          <CreateBook refetch={refetch}/>
          <Divider style={{margin: '16px 0'}}/>
          <UpdateBook books={reversedBooks} refetch={refetch}/>
          <Divider style={{margin: '16px 0'}}/>
          <ShareLinkButton isDisabled={false} user={user}/>
        </Box>
      )}
    </Container>
  );
};

export default BookProfile;
