import { Container, Typography, Paper, Divider, Box, Button } from '@mui/material';
import AuthStatus from '../../organisms/AuthStatus/AuthStatus';
import { useUserQuery } from '../user/query.generated';
import Books from './Books';
import CreateBook from './CreateBook';
import DeleteBook from './DeleteBook';
import { useBooksQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButton';
import { useRouter } from 'next/router';
import UpdateBook from './UpdateBook';

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
    <Container sx={{ bgcolor: 'black' }}>
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => router.push('/user')} 
        >
          {user && (`Go to Account Page`)}
          {!user && (`Go to Signin Page`)}
        </Button>
      </Box>
      <Box py={1} mb={4}>
        <Divider style={{margin: '16px 0'}}/>
        <CreateBook refetch={refetch}/>
        <Divider style={{margin: '16px 0'}}/>
        {/* <UpdateBook books={reversedBooks} refetch={refetch}/> */}
        <Divider style={{margin: '16px 0'}}/>
        {/* <DeleteBook books={books} refetch={refetch}/> */}
        {/* <Divider style={{margin: '16px 0'}}/> */}
        <ShareLinkButton/>
      </Box>
    </Container>
  );
};

export default BookProfile;
