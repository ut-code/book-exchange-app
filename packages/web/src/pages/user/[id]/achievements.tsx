import React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Avatar,
  CardMedia,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
} from '@mui/icons-material';

// Mock data - replace with actual GraphQL query
const mockAchievements = [
  {
    id: '1',
    badge: {
      id: 'badge1',
      name: '初回交換',
      description: '最初の本交換を完了しました',
      iconUrl: '/badges/first-exchange.png',
      type: 'FIRST_EXCHANGE',
    },
    earnedAt: '2025-06-20T10:30:00Z',
  },
  {
    id: '2',
    badge: {
      id: 'badge2',
      name: 'ブックコレクター',
      description: '20冊以上の本を登録しました',
      iconUrl: '/badges/book-collector.png',
      type: 'BOOK_COLLECTOR',
    },
    earnedAt: '2025-06-19T15:45:00Z',
  },
  {
    id: '3',
    badge: {
      id: 'badge3',
      name: '親切なレビュアー',
      description: '10件のレビューを投稿しました',
      iconUrl: '/badges/helpful-reviewer.png',
      type: 'HELPFUL_REVIEWER',
    },
    earnedAt: '2025-06-18T09:15:00Z',
  },
];

const mockAvailableBadges = [
  {
    id: 'badge4',
    name: '交換マスター',
    description: '5回の本交換を完了してください',
    iconUrl: '/badges/five-exchanges.png',
    type: 'FIVE_EXCHANGES',
  },
  {
    id: 'badge5',
    name: '完璧な評価',
    description: '5.0の信頼スコアを維持してください',
    iconUrl: '/badges/perfect-rating.png',
    type: 'PERFECT_RATING',
  },
];

export default function UserAchievementsPage() {
  const router = useRouter();
  const { id: userId } = router.query;

  const handleGoBack = () => {
    router.back();
  };

  // Mock loading state
  const loading = false;
  const error = null;

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          エラーが発生しました: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          戻る
        </Button>
        
        <Typography variant="h4" gutterBottom>
          実績バッジ
        </Typography>
        <Typography variant="body1" color="text.secondary">
          獲得した実績と未獲得のバッジ一覧
        </Typography>
      </Box>

      {/* 獲得済みバッジ */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TrophyIcon sx={{ mr: 1, color: 'gold' }} />
          獲得済みバッジ ({mockAchievements.length})
        </Typography>
        
        {mockAchievements.length === 0 ? (
          <Alert severity="info">
            まだ獲得したバッジがありません。本の交換やレビューを行ってバッジを獲得しましょう！
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {mockAchievements.map((achievement) => (
              <Grid item xs={12} sm={6} md={4} key={achievement.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    border: '2px solid gold',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: 'auto', 
                        mb: 2,
                        backgroundColor: 'gold',
                      }}
                    >
                      <TrophyIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h6" gutterBottom>
                      {achievement.badge.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {achievement.badge.description}
                    </Typography>
                    <Chip
                      label={`獲得日: ${new Date(achievement.earnedAt).toLocaleDateString('ja-JP')}`}
                      size="small"
                      color="success"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* 未獲得バッジ */}
      <Box>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <StarIcon sx={{ mr: 1, color: 'gray' }} />
          未獲得バッジ ({mockAvailableBadges.length})
        </Typography>
        
        <Grid container spacing={3}>
          {mockAvailableBadges.map((badge) => (
            <Grid item xs={12} sm={6} md={4} key={badge.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  opacity: 0.6,
                  border: '2px solid gray',
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mx: 'auto', 
                      mb: 2,
                      backgroundColor: 'gray',
                    }}
                  >
                    <StarIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {badge.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {badge.description}
                  </Typography>
                  <Chip
                    label="未獲得"
                    size="small"
                    color="default"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}