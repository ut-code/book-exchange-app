import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Chip,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export interface TrustReview {
  id: string;
  rating: number;
  comment?: string;
  reviewType: string;
  createdAt: string;
  reviewerUser: {
    id: string;
    username: string;
  };
}

interface TrustReviewListProps {
  reviews: TrustReview[];
  loading?: boolean;
}

export const TrustReviewList: React.FC<TrustReviewListProps> = ({
  reviews,
  loading = false,
}) => {
  const getReviewTypeLabel = (type: string): string => {
    switch (type) {
      case 'EXCHANGE_COMPLETION':
        return '交換の完了';
      case 'COMMUNICATION_QUALITY':
        return 'コミュニケーション';
      case 'ITEM_CONDITION':
        return 'アイテムの状態';
      case 'PUNCTUALITY':
        return '時間の正確性';
      case 'GENERAL':
        return '全般的な評価';
      default:
        return type;
    }
  };

  const getReviewTypeColor = (type: string) => {
    switch (type) {
      case 'EXCHANGE_COMPLETION':
        return 'success';
      case 'COMMUNICATION_QUALITY':
        return 'info';
      case 'ITEM_CONDITION':
        return 'warning';
      case 'PUNCTUALITY':
        return 'secondary';
      case 'GENERAL':
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>レビューを読み込み中...</Typography>
      </Box>
    );
  }

  if (reviews.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="text.secondary">
          まだレビューがありません
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {reviews.map((review, index) => (
        <Card key={review.id} variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, fontSize: '14px' }}>
                  {review.reviewerUser.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="subtitle2">
                  {review.reviewerUser.username}
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.createdAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating
                value={review.rating}
                precision={0.1}
                readOnly
                size="small"
                icon={<StarIcon fontSize="inherit" />}
                emptyIcon={<StarIcon fontSize="inherit" />}
              />
              <Typography variant="body2" fontWeight="bold">
                {review.rating.toFixed(1)}
              </Typography>
              <Chip
                label={getReviewTypeLabel(review.reviewType)}
                size="small"
                color={getReviewTypeColor(review.reviewType) as any}
                variant="outlined"
              />
            </Box>

            {review.comment && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
            )}
          </CardContent>
          
          {index < reviews.length - 1 && <Divider />}
        </Card>
      ))}
    </Stack>
  );
};