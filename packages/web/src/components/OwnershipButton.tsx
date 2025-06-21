import React from 'react';
import { Button } from '@mui/material';
import { Add as AddIcon, Check as CheckIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useIsBookOwnedByUserQuery, useToggleBookOwnershipMutation } from '../pages/book/bookOwnership.generated';

interface OwnershipButtonProps {
  bookTemplateId: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const OwnershipButton: React.FC<OwnershipButtonProps> = ({
  bookTemplateId,
  variant = 'contained',
  size = 'medium',
  fullWidth = false,
}) => {
  const { data: ownershipData, loading: ownershipLoading, refetch } = useIsBookOwnedByUserQuery({
    variables: { bookTemplateId },
    errorPolicy: 'ignore', // Ignore auth errors for unauthenticated users
  });

  const [toggleOwnership, { loading: toggleLoading }] = useToggleBookOwnershipMutation({
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error toggling book ownership:', error);
    },
  });

  const isOwned = ownershipData?.isBookOwnedByUser || false;
  const isLoading = ownershipLoading || toggleLoading;

  const handleToggleOwnership = () => {
    toggleOwnership({
      variables: {
        input: { bookTemplateId },
      },
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      startIcon={isOwned ? <CheckIcon /> : <AddIcon />}
      onClick={handleToggleOwnership}
      disabled={isLoading}
      color={isOwned ? 'success' : 'primary'}
      sx={{
        ...(isOwned && variant === 'contained' && {
          backgroundColor: 'success.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'success.dark',
          },
        }),
      }}
    >
      持ってる
    </Button>
  );
};

export default OwnershipButton;