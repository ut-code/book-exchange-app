import { Divider, Box, Button, Stack, Typography, Card, CardContent, Grid } from '@mui/material';
import { useUserQuery } from '../user/query.generated';
import CreateBook from './CreateBook';
import { useBooksQuery } from './query.generated';
import ShareLinkButton from '../../organisms/ShareLink/ShareLinkButtonPresenter';
import { useRouter } from 'next/router';
import UpdateBook from './EditBook';
import { LibraryBooks, People, BookmarkAdd, AdminPanelSettings, Add } from '@mui/icons-material';
import { AppLayout } from '../../components/Layout';

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

  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: '本の管理' },
  ];

  return (
    <AppLayout title="本の管理" breadcrumbs={breadcrumbs}>
      {user && (
        <Box>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  機能メニュー
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                      onClick={() => {
                        const createBookElement = document.getElementById('create-book-section');
                        if (createBookElement) {
                          createBookElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      fullWidth
                    >
                      本の追加
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      startIcon={<LibraryBooks />}
                      onClick={() => router.push('/book/templates')}
                      fullWidth
                    >
                      本のテンプレート一覧
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      startIcon={<BookmarkAdd />}
                      onClick={() => router.push('/book/want-to-read')}
                      fullWidth
                    >
                      読みたい本リスト
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      startIcon={<People />}
                      onClick={() => router.push('/user/Users')}
                      fullWidth
                    >
                      全ユーザー一覧
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      startIcon={<AdminPanelSettings />}
                      onClick={() => router.push('/admin')}
                      fullWidth
                    >
                      管理画面
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card id="create-book-section">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  本の追加
                </Typography>
                <CreateBook refetch={refetch}/>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  本の編集・管理
                </Typography>
                <UpdateBook books={reversedBooks} refetch={refetch}/>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <ShareLinkButton isDisabled={false} user={user}/>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      )}
      {!user && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ログインが必要です
            </Typography>
            <Typography variant="body1" color="text.secondary">
              本の管理機能を使用するには、ログインしてください。
            </Typography>
            <Box mt={2}>
              <Button 
                variant="contained"
                onClick={() => router.push('/user')}
              >
                ログインページへ
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </AppLayout>
  );
};

export default BookProfile;
