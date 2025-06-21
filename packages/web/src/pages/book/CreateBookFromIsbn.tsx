import React, { useState } from 'react';
import { TextField, Button, Box, Container, Alert, CircularProgress, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

const CREATE_BOOK_FROM_ISBN_MUTATION = gql`
  mutation CreateBookFromIsbn($input: CreateBookFromIsbnInput!) {
    createBookFromIsbn(input: $input) {
      id
      title
      description
      isbn
      author
      publisher
      publishedDate
      pageCount
      language
      categories
      imageUrl
      infoLink
      createdAt
      updatedAt
    }
  }
`;

type CreateBookFromIsbnProps = {
  refetch: () => Promise<any>;
};

const CreateBookFromIsbn = (props: CreateBookFromIsbnProps) => {
  const [createBookFromIsbn] = useMutation(CREATE_BOOK_FROM_ISBN_MUTATION);
  const [isbn, setIsbn] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleCreateBookFromIsbn = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if (!isbn) {
        setError('ISBNを入力してください');
        return;
      }

      const result = await createBookFromIsbn({
        variables: {
          input: {
            isbn,
            description,
          },
        },
      });
      
      setIsbn('');
      setDescription('');
      setSuccess('ISBNから本の情報を取得して追加しました！');
      await props.refetch();
    } catch (error: any) {
      console.error('Error:', error);
      
      if (error.networkError?.result?.errors?.[0]?.message) {
        setError(error.networkError.result.errors[0].message);
      } else if (error.graphQLErrors?.[0]?.message) {
        setError(error.graphQLErrors[0].message);
      } else if (error.message) {
        if (error.message.includes('400')) {
          setError('無効なISBNフォーマットです。正しいISBNを入力してください。');
        } else if (error.message.includes('403')) {
          setError('Google Books APIの制限に達しました。しばらく待ってから再試行してください。');
        } else if (error.message.includes('timeout')) {
          setError('リクエストがタイムアウトしました。ネットワーク接続を確認してください。');
        } else if (error.message.includes('Network error')) {
          setError('ネットワークエラーが発生しました。インターネット接続を確認してください。');
        } else {
          setError(error.message);
        }
      } else {
        setError('予期しないエラーが発生しました。もう一度お試しください。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        ISBNから本を追加
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="ISBN（ハイフンなしでも可）"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          autoComplete="off"
          placeholder="例: 9784798169255"
          helperText="ISBNを入力すると、Google Books APIから自動で書誌情報を取得します"
        />
      </Box>
      
      <Box mb={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="追加の説明（任意）"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="off"
          multiline
          rows={3}
          helperText="Google Booksの説明に追加したい内容があれば入力してください"
        />
      </Box>
      
      <Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreateBookFromIsbn} 
          disabled={!isbn || loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'ISBN情報を取得中...' : 'ISBNから本を追加'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateBookFromIsbn;