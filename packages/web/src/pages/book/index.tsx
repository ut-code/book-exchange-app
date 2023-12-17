import { Container, Divider, Box, Button, Stack } from '@mui/material';
import { useUserQuery } from '../user/query.generated';
import CreateBook from './CreateBook';
import { useBooksQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButtonPresenter';
import { useRouter } from 'next/router';
import UpdateBook from './EditBook';
import UserInfo from '../../organisms/UserInfo/UserInfo';
import { AccountCircle, Settings } from '@mui/icons-material';

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
