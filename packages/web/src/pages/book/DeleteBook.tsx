import React, { useState } from 'react';
import { useUsersQuery } from '../../pages/user/query.generated';
import Books from './Books';
import { BooksQuery, useBooksQuery, useCreateBookMutation, useDeleteBookMutation, useDeleteBooksMutation } from './query.generated';
import { Checkbox, Button, List, ListItem, ListItemText, Divider, Container, Box } from '@mui/material';


type DeleteBookProps = {
  books: BooksQuery['books'];
  refetch: () => Promise<any>;
}

const DeleteBook = (props: DeleteBookProps) => {  
  const [deleteBooks] = useDeleteBooksMutation();
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  const handleDeleteBooks = async () => {
    try {
      await deleteBooks({
        variables: {
          ids: selectedBookIds,
        },
      })
      await props.refetch();
      setSelectedBookIds([]);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleSelectBook = (bookId: string) => {
    setSelectedBookIds((prevSelected) => {
      if (prevSelected.includes(bookId)) {
        return prevSelected.filter(id => id !== bookId);
      } else {
        return [...prevSelected, bookId];
      }
    });
  }

  return (
    <>
      <List>
        {props.books.map((book) => (
          <React.Fragment key={book.id}>
            <ListItem>
              <Checkbox
                edge="start"
                checked={selectedBookIds.includes(book.id)}
                onChange={() => toggleSelectBook(book.id)}
              />
              <ListItemText primary={book.title} secondary={book.description} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Box mt={1}>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleDeleteBooks} 
          disabled={selectedBookIds.length === 0}>
          本を削除する
        </Button>
      </Box>
    </>
  );
}

export default DeleteBook;