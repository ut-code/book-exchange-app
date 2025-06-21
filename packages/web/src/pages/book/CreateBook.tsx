import React, { useState } from 'react';
import { BooksQuery, useCreateBookMutation } from './query.generated';
import { TextField, Button, Box, Container, Tabs, Tab, Typography } from '@mui/material';
import { ApolloQueryResult } from 'apollo-boost';
import CreateBookFromIsbn from './CreateBookFromIsbn';

type CreateBookProps = {
  refetch: () => Promise<any>;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CreateBook = (props: CreateBookProps) => {
  const [createBook] = useCreateBookMutation();
  const [tabValue, setTabValue] = useState(0);

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="book creation tabs">
          <Tab label="手動で追加" {...a11yProps(0)} />
          <Tab label="ISBNから追加" {...a11yProps(1)} />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          手動で本を追加
        </Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="本のタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="説明"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            multiline
            rows={3}
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={handleCreateBook} disabled={!title}>
            本を追加する
          </Button>
        </Box>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <CreateBookFromIsbn refetch={props.refetch} />
      </TabPanel>
    </Box>
  );
}

export default CreateBook;
