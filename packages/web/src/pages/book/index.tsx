import { Container, Typography, Paper, Divider, Box, Button, Stack } from '@mui/material';
import AuthStatus from '../../organisms/AuthStatus/AuthStatusContainer';
import { useUserQuery } from '../user/query.generated';
import Books from './Books';
import CreateBook from './CreateBook';
import DeleteBook from './DeleteBook';
import { useBooksQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButtonPresenter';
import { useRouter } from 'next/router';
import UpdateBook from './EditBook';
import UserInfo from '../../organisms/UserInfo/UserInfo';
import { Settings } from '@mui/icons-material';
import SigninUser from '@/organisms/Signin/SigninUserContainer';
import SignupUser from '@/organisms/Signup/SignupUser';

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
    <Container sx={{ bgcolor: 'black', width: '70%' }}>
      <Stack my={2} direction="row" justifyContent="space-between">
        {user && (
          <UserInfo user={user} isAuthenticated={true}/>
        )}
        <Box>
          <Button 
            color="primary"
            onClick={() => router.push('/user')} 
          >
            <Settings sx={{color: "gray"}}/>
          </Button>
        </Box>
      </Stack>
      {user && (
        <Box mt={5}>
          <CreateBook refetch={refetch}/>
          <Divider style={{margin: '16px 0'}}/>
          <UpdateBook books={reversedBooks} refetch={refetch}/>
          <Divider style={{margin: '16px 0'}}/>
          {/* <DeleteBook books={books} refetch={refetch}/> */}
          {/* <Divider style={{margin: '16px 0'}}/> */}
          <ShareLinkButton isDisabled={false} user={user}/>
        </Box>
      )}
    </Container>
  );
};

export default BookProfile;
