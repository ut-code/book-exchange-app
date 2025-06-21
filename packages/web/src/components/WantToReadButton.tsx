import React from 'react';
import { Button } from '@mui/material';
import { BookmarkAdd as BookmarkAddIcon, BookmarkRemove as BookmarkRemoveIcon } from '@mui/icons-material';
import { useAddToWantToReadMutation, useRemoveFromWantToReadMutation, useIsInWantToReadListQuery, MyWantToReadListDocument } from '../pages/book/wantToRead.generated';
import { useApolloClient } from '@apollo/client';

interface WantToReadButtonProps {
  bookTemplateId: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const WantToReadButton: React.FC<WantToReadButtonProps> = ({
  bookTemplateId,
  variant = 'outlined',
  size = 'medium',
  fullWidth = false,
}) => {
  const apolloClient = useApolloClient();
  const { data: isInWantToReadData, loading: isInWantToReadLoading, refetch } = useIsInWantToReadListQuery({
    variables: { bookTemplateId },
    errorPolicy: 'ignore', // Ignore auth errors for unauthenticated users
  });

  const [addToWantToRead, { loading: addLoading }] = useAddToWantToReadMutation({
    onCompleted: () => {
      refetch();
      // Also refetch the want-to-read list page
      apolloClient.refetchQueries({
        include: [MyWantToReadListDocument],
      });
    },
    onError: (error) => {
      console.error('Error adding to want to read list:', error);
    },
  });

  const [removeFromWantToRead, { loading: removeLoading }] = useRemoveFromWantToReadMutation({
    onCompleted: () => {
      refetch();
      // Also refetch the want-to-read list page
      apolloClient.refetchQueries({
        include: [MyWantToReadListDocument],
      });
    },
    onError: (error) => {
      console.error('Error removing from want to read list:', error);
    },
  });

  const isInWantToRead = isInWantToReadData?.isInWantToReadList || false;
  const isLoading = isInWantToReadLoading || addLoading || removeLoading;

  const handleToggleWantToRead = () => {
    if (isInWantToRead) {
      removeFromWantToRead({
        variables: {
          input: { bookTemplateId },
        },
      });
    } else {
      addToWantToRead({
        variables: {
          input: { bookTemplateId },
        },
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={isInWantToRead ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
      onClick={handleToggleWantToRead}
      disabled={isLoading}
      color={isInWantToRead ? 'secondary' : 'primary'}
    >
      {isInWantToRead ? '読みたいリストから削除' : '読みたい'}
    </Button>
  );
};

export default WantToReadButton;