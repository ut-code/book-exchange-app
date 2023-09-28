import React, { useState } from 'react';
import { BooksQuery, useDeleteBookMutation, useUpdateBookMutation } from './query.generated';
import { TextField, Button, Box, Container, Modal, List, ListItem, ListItemText, Paper, Stack } from '@mui/material';

type EditBookProps = {
  books: BooksQuery['books'];
  refetch: () => Promise<any>;
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
        {props.books.map((book) => (
          <ListItem key={book.id} button onClick={() => handleBookClick(book.id, book.title, book.description)}>
            <ListItemText primary={book.title} secondary={book.description} />
          </ListItem>
        ))}
      </List>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Paper style={{ margin: 'auto', width: '70%', padding: '20px', marginTop: '5%', borderRadius: '5px' }}>
          <Container>
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
