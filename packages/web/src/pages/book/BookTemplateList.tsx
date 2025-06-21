import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Button,
  Box,
  Chip,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon, ArrowBack as ArrowBackIcon, Add as AddIcon, BookmarkAdd as BookmarkAddIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useGetAllBookTemplatesQuery, useSearchBookTemplatesQuery } from './bookTemplate.generated';
import WantToReadButton from '../../components/WantToReadButton';
import OwnershipButton from '../../components/OwnershipButton';



const BookTemplateList: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: allTemplatesData, loading: allTemplatesLoading, error: allTemplatesError } = useGetAllBookTemplatesQuery({
    variables: { limit: 50 },
    skip: searchQuery.length > 0,
  });

  const { data: searchData, loading: searchLoading, error: searchError } = useSearchBookTemplatesQuery({
    variables: { query: searchQuery, limit: 20 },
    skip: searchQuery.length === 0,
  });

  // デバッグ用ログ
  React.useEffect(() => {
    console.log('BookTemplateList Debug:', {
      searchQuery,
      allTemplatesData,
      allTemplatesLoading,
      allTemplatesError,
      searchData,
      searchLoading,
      searchError,
    });
  }, [searchQuery, allTemplatesData, allTemplatesLoading, allTemplatesError, searchData, searchLoading, searchError]);

  const bookTemplates = searchQuery.length > 0 
    ? searchData?.searchBookTemplates || []
    : allTemplatesData?.getAllBookTemplates || [];

  const loading = searchQuery.length > 0 ? searchLoading : allTemplatesLoading;

  const handleGoBack = () => {
    router.push('/book');
  };

  const handleGoToWantToRead = () => {
    router.push('/book/want-to-read');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1">
            本のテンプレート一覧
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<BookmarkAddIcon />}
          onClick={handleGoToWantToRead}
          sx={{ ml: 2 }}
        >
          読みたい本リスト
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="本のタイトル、著者、出版社、カテゴリで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      {(allTemplatesError || searchError) ? (
        <Typography color="error">
          エラーが発生しました: {allTemplatesError?.message || searchError?.message}
        </Typography>
      ) : loading ? (
        <Typography>読み込み中...</Typography>
      ) : bookTemplates.length === 0 ? (
        <Typography>本が見つかりませんでした。</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookTemplates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {template.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={template.imageUrl}
                    alt={template.title}
                    sx={{ objectFit: 'contain' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom noWrap>
                    {template.title}
                  </Typography>
                  {template.author && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      著者: {template.author}
                    </Typography>
                  )}
                  {template.publisher && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      出版社: {template.publisher}
                    </Typography>
                  )}
                  {template.publishedDate && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      出版日: {template.publishedDate}
                    </Typography>
                  )}
                  {template.pageCount && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ページ数: {template.pageCount}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    ISBN: {template.isbn}
                  </Typography>
                  {template.categories.length > 0 && (
                    <Box sx={{ mt: 1, mb: 1 }}>
                      {template.categories.slice(0, 3).map((category, index) => (
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
                    所有者数: {template.books.length}人
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <OwnershipButton
                      bookTemplateId={template.id}
                      variant="contained"
                      fullWidth
                    />
                    <WantToReadButton
                      bookTemplateId={template.id}
                      variant="outlined"
                      fullWidth
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BookTemplateList;