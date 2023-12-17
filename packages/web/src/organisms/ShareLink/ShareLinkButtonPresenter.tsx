import { env } from '@/common';
import { UserQuery, useUserQuery } from '../../pages/user/query.generated';
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';

import React from 'react';

export type ShareLinkButtonProps = {
  isDisabled: boolean;
  user: UserQuery['user'];
};

const ShareLinkButtonPresenter = (props: ShareLinkButtonProps) => {

  const link =  `${env.appUrl}/user/${props.user?.id}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert(`リンクをコピーできました.  本を貸し借りしたい友達にリンクをシェアしよう! ${link}`);
    } catch (err) {
      alert('リンクのコピーに失敗しました。手動でコピーしてください。');
      console.error('Error copying text to clipboard:', err);
    }
  };
  

  return (
    <Container>
      <Box py={2} display="flex" justifyContent="center">
        <Stack alignItems='center'>
          <Typography mb={2}>本の共有リンク発行</Typography>
          <Button onClick={copyToClipboard} disabled={props.isDisabled} variant="contained" color="primary">Copy Link</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default ShareLinkButtonPresenter;
