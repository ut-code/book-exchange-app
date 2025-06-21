import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Rating,
  FormControlLabel,
  Checkbox,
  Alert,
  Divider,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_EXCHANGE_REVIEW } from './query.graphql';
import { useRouter } from 'next/router';

interface CreateExchangeReviewProps {
  exchangeRequestId: string;
  reviewedUserId: string;
  reviewerUserId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateExchangeReview: React.FC<CreateExchangeReviewProps> = ({
  exchangeRequestId,
  reviewedUserId,
  reviewerUserId,
  onSuccess,
  onCancel,
}) => {
  const router = useRouter();
  const [smoothness, setSmoothness] = useState<number>(5);
  const [communication, setCommunication] = useState<number>(5);
  const [punctuality, setPunctuality] = useState<number>(5);
  const [bookCondition, setBookCondition] = useState<number>(5);
  const [overallRating, setOverallRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [wasSmooth, setWasSmooth] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [createExchangeReview, { loading }] = useMutation(CREATE_EXCHANGE_REVIEW, {
    onCompleted: () => {
      onSuccess?.();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (smoothness < 1 || smoothness > 5 || 
        communication < 1 || communication > 5 ||
        punctuality < 1 || punctuality > 5 ||
        bookCondition < 1 || bookCondition > 5 ||
        overallRating < 1 || overallRating > 5) {
      setError('All ratings must be between 1 and 5');
      return;
    }

    try {
      await createExchangeReview({
        variables: {
          input: {
            exchangeRequestId,
            reviewedUserId,
            smoothness,
            communication,
            punctuality,
            bookCondition,
            overallRating,
            comment: comment.trim() || null,
            wasSmooth,
          },
          reviewerUserId,
        },
      });
    } catch (err) {
      console.error('Error creating exchange review:', err);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          交換レビューを投稿
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          交換相手への評価をお聞かせください
        </Typography>

        <Divider sx={{ my: 2 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              スムーズさ
            </Typography>
            <Rating
              name="smoothness"
              value={smoothness}
              onChange={(_, newValue) => setSmoothness(newValue || 1)}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              コミュニケーション
            </Typography>
            <Rating
              name="communication"
              value={communication}
              onChange={(_, newValue) => setCommunication(newValue || 1)}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              時間の正確性
            </Typography>
            <Rating
              name="punctuality"
              value={punctuality}
              onChange={(_, newValue) => setPunctuality(newValue || 1)}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              本の状態
            </Typography>
            <Rating
              name="bookCondition"
              value={bookCondition}
              onChange={(_, newValue) => setBookCondition(newValue || 1)}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography component="legend" gutterBottom>
              総合評価
            </Typography>
            <Rating
              name="overallRating"
              value={overallRating}
              onChange={(_, newValue) => setOverallRating(newValue || 1)}
              size="large"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={wasSmooth}
                  onChange={(e) => setWasSmooth(e.target.checked)}
                />
              }
              label="全体的にスムーズな交換でした"
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="コメント（任意）"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="交換についてのコメントをお書きください"
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            {onCancel && (
              <Button onClick={onCancel} disabled={loading}>
                キャンセル
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? 'レビュー投稿中...' : 'レビューを投稿'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};