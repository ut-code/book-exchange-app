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
import { useQuery } from '@apollo/client';
import { GET_EXCHANGE_REVIEWS_BY_USER } from './query.graphql';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface ExchangeReviewListProps {
  userId: string;
}

export const ExchangeReviewList: React.FC<ExchangeReviewListProps> = ({ userId }) => {
  const { data, loading, error } = useQuery(GET_EXCHANGE_REVIEWS_BY_USER, {
    variables: { userId },
  });

  if (loading) return <Typography>レビューを読み込み中...</Typography>;
  if (error) return <Typography color="error">エラー: {error.message}</Typography>;

  const reviews = data?.getExchangeReviewsByUser || [];

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            交換レビュー
          </Typography>
          <Typography color="text.secondary">
            まだレビューがありません
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const averageRating = reviews.reduce((sum: number, review: any) => sum + review.overallRating, 0) / reviews.length;
  const smoothExchanges = reviews.filter((review: any) => review.wasSmooth).length;
  const smoothPercentage = Math.round((smoothExchanges / reviews.length) * 100);

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            交換レビュー統計
          </Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Box>
              <Typography variant="body2" color="text.secondary">
                平均評価
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={averageRating} readOnly size="small" />
                <Typography variant="body2">
                  {averageRating.toFixed(1)} ({reviews.length}件)
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                スムーズな交換
              </Typography>
              <Typography variant="h6" color="primary">
                {smoothPercentage}%
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {reviews.map((review: any) => (
          <Card key={review.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {review.reviewer.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">
                      {review.reviewer.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(new Date(review.createdAt), 'yyyy年MM月dd日', { locale: ja })}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={review.overallRating} readOnly size="small" />
                  <Chip
                    label={review.wasSmooth ? 'スムーズ' : '課題あり'}
                    color={review.wasSmooth ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    スムーズさ
                  </Typography>
                  <Rating value={review.smoothness} readOnly size="small" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    コミュニケーション
                  </Typography>
                  <Rating value={review.communication} readOnly size="small" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    時間の正確性
                  </Typography>
                  <Rating value={review.punctuality} readOnly size="small" />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    本の状態
                  </Typography>
                  <Rating value={review.bookCondition} readOnly size="small" />
                </Box>
              </Box>

              {review.comment && (
                <>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {review.comment}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};