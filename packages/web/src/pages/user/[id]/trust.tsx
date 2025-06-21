import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import { 
  TrustScoreDisplay, 
  TrustReviewForm, 
  TrustReviewList,
  TrustReview 
} from '../../../components/TrustScore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GET_USER_TRUST_REVIEWS = gql`
  query GetUserTrustReviews($userId: String!) {
    getUserTrustReviews(userId: $userId) {
      id
      rating
      comment
      reviewType
      createdAt
      reviewerUser {
        id
        username
      }
    }
  }
`;

const GET_USER_TRUST_SCORE_HISTORY = gql`
  query GetUserTrustScoreHistory($userId: String!) {
    getUserTrustScoreHistory(userId: $userId) {
      id
      oldScore
      newScore
      reason
      createdAt
    }
  }
`;

const GET_USER_DETAILS = gql`
  query GetUserDetails($id: String!) {
    user(id: $id) {
      id
      username
      trustScore
    }
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trust-tabpanel-${index}`}
      aria-labelledby={`trust-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UserTrustPage() {
  const router = useRouter();
  const { id: userId } = router.query;
  const [tabValue, setTabValue] = useState(0);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);

  const { data: userDetails, loading: userLoading } = useQuery(GET_USER_DETAILS, {
    variables: { id: userId },
    skip: !userId,
  });

  const { data: reviewsData, loading: reviewsLoading, refetch: refetchReviews } = useQuery(GET_USER_TRUST_REVIEWS, {
    variables: { userId },
    skip: !userId,
  });

  const { data: historyData, loading: historyLoading } = useQuery(GET_USER_TRUST_SCORE_HISTORY, {
    variables: { userId },
    skip: !userId,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleReviewSuccess = () => {
    refetchReviews();
  };

  if (userLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!userDetails?.user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">ユーザーが見つかりません</Alert>
      </Container>
    );
  }

  const user = userDetails.user;
  const reviews = reviewsData?.getUserTrustReviews || [];
  const history = historyData?.getUserTrustScoreHistory || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          戻る
        </Button>
        
        <Typography variant="h4" gutterBottom>
          {user.username}さんの信頼スコア
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                信頼スコア
              </Typography>
              <Box sx={{ my: 2 }}>
                <TrustScoreDisplay
                  score={user.trustScore}
                  reviewCount={reviews.length}
                  size="large"
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setReviewFormOpen(true)}
                sx={{ mt: 2 }}
              >
                レビューを書く
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label={`レビュー (${reviews.length})`} />
                <Tab label="スコア履歴" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <TrustReviewList 
                reviews={reviews} 
                loading={reviewsLoading}
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {historyLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : history.length === 0 ? (
                <Typography color="text.secondary">
                  スコア履歴がありません
                </Typography>
              ) : (
                <Box>
                  {history.map((item: any) => (
                    <Card key={item.id} variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Box display="flex" justifyContent="between" alignItems="center">
                          <Box>
                            <Typography variant="body2">
                              {item.oldScore.toFixed(1)} → {item.newScore.toFixed(1)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.reason}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(item.createdAt).toLocaleDateString('ja-JP')}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      <TrustReviewForm
        open={reviewFormOpen}
        onClose={() => setReviewFormOpen(false)}
        targetUserId={user.id}
        targetUsername={user.username}
        onSuccess={handleReviewSuccess}
      />
    </Container>
  );
}