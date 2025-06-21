import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useMyWantToReadListQuery } from './wantToRead.generated';
import WantToReadButton from '../../components/WantToReadButton';

const WantToReadList: React.FC = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useMyWantToReadListQuery({
    fetchPolicy: 'cache-and-network', // Always fetch fresh data
    errorPolicy: 'all',
  });

  const handleGoBack = () => {
    router.push('/book');
  };

  const handleGoToBookTemplates = () => {
    router.push('/book/templates');
  };

  // Refetch data when component mounts or becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
      }
    };

    // Refetch on mount
    refetch();

    // Refetch when page becomes visible
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', () => refetch());

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', refetch);
    };
  }, [refetch]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>読み込み中...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">
          エラーが発生しました: {error.message}
        </Typography>
      </Container>
    );
  }

  const wantToReadList = data?.myWantToReadList || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          読みたい本リスト
        </Typography>
      </Box>

      {wantToReadList.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            読みたい本がまだありません
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            本のテンプレート一覧から気になる本を「読みたい」リストに追加してみましょう
          </Typography>
          <Button
            variant="contained"
            onClick={handleGoToBookTemplates}
            sx={{ mt: 2 }}
          >
            本のテンプレート一覧を見る
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {wantToReadList.length}冊の本があります
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {wantToReadList.map((wantToRead) => (
              <Grid item xs={12} sm={6} md={4} key={wantToRead.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {wantToRead.bookTemplate.imageUrl && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={wantToRead.bookTemplate.imageUrl}
                      alt={wantToRead.bookTemplate.title}
                      sx={{ objectFit: 'contain' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom noWrap>
                      {wantToRead.bookTemplate.title}
                    </Typography>
                    {wantToRead.bookTemplate.author && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        著者: {wantToRead.bookTemplate.author}
                      </Typography>
                    )}
                    {wantToRead.bookTemplate.publisher && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        出版社: {wantToRead.bookTemplate.publisher}
                      </Typography>
                    )}
                    {wantToRead.bookTemplate.publishedDate && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        出版日: {wantToRead.bookTemplate.publishedDate}
                      </Typography>
                    )}
                    {wantToRead.bookTemplate.pageCount && (
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        ページ数: {wantToRead.bookTemplate.pageCount}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ISBN: {wantToRead.bookTemplate.isbn}
                    </Typography>
                    {wantToRead.bookTemplate.categories.length > 0 && (
                      <Box sx={{ mt: 1, mb: 1 }}>
                        {wantToRead.bookTemplate.categories.slice(0, 3).map((category, index) => (
                          <Chip
                            key={index}
                            label={category}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                    )}
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      追加日: {new Date(wantToRead.createdAt).toLocaleDateString('ja-JP')}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <WantToReadButton
                        bookTemplateId={wantToRead.bookTemplate.id}
                        variant="outlined"
                        fullWidth
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default WantToReadList;