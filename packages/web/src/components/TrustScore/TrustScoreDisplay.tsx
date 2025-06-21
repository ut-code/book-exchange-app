import React from 'react';
import { Box, Typography, Rating, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface TrustScoreDisplayProps {
  score: number;
  reviewCount?: number;
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export const TrustScoreDisplay: React.FC<TrustScoreDisplayProps> = ({
  score,
  reviewCount,
  size = 'medium',
  showText = true,
}) => {
  const getTrustLevel = (score: number): { text: string; color: 'success' | 'warning' | 'error' | 'info' } => {
    if (score >= 4.5) return { text: '非常に信頼できる', color: 'success' };
    if (score >= 4.0) return { text: '信頼できる', color: 'success' };
    if (score >= 3.5) return { text: '普通', color: 'info' };
    if (score >= 3.0) return { text: '注意が必要', color: 'warning' };
    return { text: '要注意', color: 'error' };
  };

  const trustLevel = getTrustLevel(score);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Rating
        value={score}
        precision={0.1}
        readOnly
        size={size}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" />}
      />
      
      {showText && (
        <>
          <Typography variant="body2" fontWeight="bold">
            {score.toFixed(1)}
          </Typography>
          
          <Chip
            label={trustLevel.text}
            color={trustLevel.color}
            size="small"
            variant="outlined"
          />
          
          {reviewCount !== undefined && (
            <Typography variant="caption" color="text.secondary">
              ({reviewCount}件のレビュー)
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};