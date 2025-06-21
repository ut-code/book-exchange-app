import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_TRUST_REVIEW = gql`
  mutation CreateTrustReview($createTrustReviewInput: CreateTrustReviewInput!) {
    createTrustReview(createTrustReviewInput: $createTrustReviewInput) {
      id
      rating
      comment
      reviewType
      createdAt
      targetUser {
        id
        username
      }
    }
  }
`;

export enum TrustReviewType {
  EXCHANGE_COMPLETION = 'EXCHANGE_COMPLETION',
  COMMUNICATION_QUALITY = 'COMMUNICATION_QUALITY',
  ITEM_CONDITION = 'ITEM_CONDITION',
  PUNCTUALITY = 'PUNCTUALITY',
  GENERAL = 'GENERAL',
}

interface TrustReviewFormProps {
  open: boolean;
  onClose: () => void;
  targetUserId: string;
  targetUsername: string;
  exchangeRequestId?: string;
  onSuccess?: () => void;
}

export const TrustReviewForm: React.FC<TrustReviewFormProps> = ({
  open,
  onClose,
  targetUserId,
  targetUsername,
  exchangeRequestId,
  onSuccess,
}) => {
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState('');
  const [reviewType, setReviewType] = useState<TrustReviewType>(TrustReviewType.GENERAL);
  const [error, setError] = useState('');

  const [createTrustReview, { loading }] = useMutation(CREATE_TRUST_REVIEW, {
    onCompleted: () => {
      onSuccess?.();
      handleClose();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleClose = () => {
    setRating(5);
    setComment('');
    setReviewType(TrustReviewType.GENERAL);
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!rating) {
      setError('評価を選択してください');
      return;
    }

    try {
      await createTrustReview({
        variables: {
          createTrustReviewInput: {
            rating,
            comment: comment.trim() || undefined,
            reviewType,
            targetUserId,
            exchangeRequestId,
          },
        },
      });
    } catch (error) {
      console.error('Trust review creation failed:', error);
    }
  };

  const getReviewTypeLabel = (type: TrustReviewType): string => {
    switch (type) {
      case TrustReviewType.EXCHANGE_COMPLETION:
        return '交換の完了';
      case TrustReviewType.COMMUNICATION_QUALITY:
        return 'コミュニケーション';
      case TrustReviewType.ITEM_CONDITION:
        return 'アイテムの状態';
      case TrustReviewType.PUNCTUALITY:
        return '時間の正確性';
      case TrustReviewType.GENERAL:
        return '全般的な評価';
      default:
        return type;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {targetUsername}さんへのレビュー
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ py: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              評価 *
            </Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              precision={0.5}
              size="large"
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarIcon fontSize="inherit" />}
            />
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>レビューの種類</InputLabel>
            <Select
              value={reviewType}
              label="レビューの種類"
              onChange={(e) => setReviewType(e.target.value as TrustReviewType)}
            >
              {Object.values(TrustReviewType).map((type) => (
                <MenuItem key={type} value={type}>
                  {getReviewTypeLabel(type)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="コメント（任意）"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="交換の体験について詳しく教えてください..."
            helperText="他のユーザーの参考になるようなコメントをお書きください"
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          キャンセル
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading || !rating}
        >
          レビューを投稿
        </Button>
      </DialogActions>
    </Dialog>
  );
};