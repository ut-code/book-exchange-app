import { useUserQuery } from '../../pages/user/query.generated';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';

import React from 'react';

const ShareLinkButton = () => {
  const query = useUserQuery();
  const user = query.data?.user;

  const link = `localhost:3000/user/${user?.id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
    alert(`リンクをコピーできました.  本を貸し借りしたい友達にリンクをシェアしよう! ${link}`)
  }

  return (
    <Container>
      <Box pt={2} display="flex" justifyContent="center">
        <Stack alignItems='center'>
          <Typography mb={2}>本の共有リンク発行</Typography>
          <Button onClick={copyToClipboard} variant="contained" color="primary">Copy Link</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ShareLinkButton;
