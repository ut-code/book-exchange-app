import React, { useState } from 'react';
import { BooksQuery, useCreateBookMutation } from './query.generated';
import { TextField, Button, Box, Container } from '@mui/material';
import { ApolloQueryResult } from 'apollo-boost';

type CreateBookProps = {
  refetch: () => Promise<any>;
};

const CreateBook = (props: CreateBookProps) => {
  const [createBook] = useCreateBookMutation();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleCreateBook = async () => {
    try {
      if (!title) {
        return;
      }
      await createBook({
        variables: {
          input: {
            title,
            description,
          },
        },
      });
      setTitle('');
      setDescription('');
      await props.refetch();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
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
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleCreateBook} disabled={!title}>
          本を追加する
        </Button>
      </Box>
    </>
  );
}

export default CreateBook;
