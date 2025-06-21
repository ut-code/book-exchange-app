import React, { useState } from 'react';
import { BooksQuery, useDeleteBookMutation, useUpdateBookMutation } from './query.generated';
import { TextField, Button, Box, Container, Modal, List, ListItem, ListItemText, Paper, Stack, Typography, Chip, Divider } from '@mui/material';

type EditBookProps = {
  books: BooksQuery['books'];
  refetch: () => Promise<any>;
};

interface TruncatedDescriptionProps {
  description: string;
  onClick: () => void;
}

const TruncatedDescription: React.FC<TruncatedDescriptionProps> = ({ description, onClick }) => {
  if (!description) {
    return (
      <Typography 
        variant="body2" 
        color="text.secondary"
        onClick={onClick}
        sx={{ cursor: 'pointer', fontStyle: 'italic' }}
      >
        説明なし（クリックして追加）
      </Typography>
    );
  }

  // Check if description would be truncated by counting approximate lines
  const isLongDescription = description.length > 150 || description.split('\n').length > 3;

  return (
    <Box onClick={onClick} sx={{ cursor: 'pointer', width: '100%' }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          borderRadius: 1,
          p: 1,
          transition: 'background-color 0.2s',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const EditBook = (props: EditBookProps) => {
  const [editBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleBookClick = (bookId: string, bookTitle: string, bookDescription: string) => {
    setSelectedBookId(bookId);
    setTitle(bookTitle);
    setDescription(bookDescription);
    setIsModalOpen(true);
  };

  const handleUpdateBook = async () => {
    try {
      if (!title || !selectedBookId) {
        return;
      }
      await editBook({
        variables: {
          id: selectedBookId,
          input: {
            title,
            description,
          },
        },
      });
      setTitle('');
      setDescription('');
      setIsModalOpen(false);
      setSelectedBookId(null);
      await props.refetch();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteBook = async () => {
    try {
      if (!selectedBookId) {
        return;
      }
      const response = await deleteBook({
        variables: {
          id: selectedBookId,
        },
      });
      setTitle('');
      setDescription('');
      setIsModalOpen(false);
      setSelectedBookId(null);
      await props.refetch();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <List>
        {props.books.map((book, index) => (
          <React.Fragment key={book.id}>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1 }}>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                {(book.description && (book.description.length > 150 || book.description.split('\n').length > 3)) && (
                  <Chip
                    label="クリックして編集・全表示"
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => handleBookClick(book.id, book.title, book.description)}
                    sx={{ flexShrink: 0 }}
                  />
                )}
              </Box>
              <TruncatedDescription
                description={book.description}
                onClick={() => handleBookClick(book.id, book.title, book.description)}
              />
            </ListItem>
            {index < props.books.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Paper style={{ margin: 'auto', width: '70%', padding: '20px', marginTop: '5%', borderRadius: '5px' }}>
          <Container>
            <Typography variant="h5" component="h2" gutterBottom>
              本の編集
            </Typography>
            <Box mt={3} mb={2}>
              <TextField
                fullWidth
                variant="outlined"
                label="本のタイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete="off"
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                variant="outlined"
                label="説明"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="off"
                multiline
                rows={6}
                placeholder="本の説明を入力してください..."
              />
            </Box>
            <Stack mt={2} direction="row" justifyContent="space-between">
              <Stack direction="row">
                <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
                  キャンセル
                </Button>
                <Box ml={2}>
                  <Button variant="contained" color="primary" onClick={handleUpdateBook} disabled={!title}>
                    更新する
                  </Button>
                </Box>
              </Stack>
              <Box>
                <Button variant="outlined" color="secondary" onClick={handleDeleteBook}>
                  削除する
                </Button>
              </Box>
            </Stack>
          </Container>
        </Paper>
      </Modal>
    </>
  );
}

export default EditBook;
