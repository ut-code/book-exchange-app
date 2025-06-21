import { Typography, Box, Grid, Card, CardContent, CardActions, Button, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { AppLayout } from '../components/Layout';
import { useUserQuery } from './user/query.generated';

export default function Home() {
  const router = useRouter();
  const { data } = useUserQuery();
  const user = data?.user;

  return (
    <AppLayout title="BookExchange - ホーム">
      <Box>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          BookExchange
        </Typography>
        <Typography variant="h6" component="p" gutterBottom align="center" color="text.secondary">
          本の交換・共有プラットフォーム
        </Typography>

        {user && (
          <Box sx={{ mt: 2, mb: 4 }}>
            <Typography variant="h6" color="primary">
              Welcome, {user.username || 'ユーザー'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              User ID: {user.id}
            </Typography>
          </Box>
        )}

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  本の管理
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  あなたの本を追加・編集・管理できます
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained"
                  onClick={() => router.push('/book')}
                >
                  本の管理へ
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ユーザー
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ユーザー管理、プロフィール設定、認証
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained"
                  onClick={() => router.push('/user')}
                >
                  ユーザーページへ
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  交換レビュー
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  本の交換履歴とレビューを確認
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained"
                  onClick={() => router.push('/exchange-review')}
                >
                  レビューページへ
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {!user && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              始めるには
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              BookExchangeを利用するにはログインが必要です
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => router.push('/user')}
            >
              ログイン・新規登録
            </Button>
          </Box>
        )}
      </Box>
    </AppLayout>
  );
}
