import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  SwapHoriz as ExchangeIcon,
  Person as PersonIcon,
  Book as BookIcon,
} from '@mui/icons-material';

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
      id={`exchange-tabpanel-${index}`}
      aria-labelledby={`exchange-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock data - replace with actual GraphQL query
const mockExchangeHistory = [
  {
    id: '1',
    status: 'COMPLETED',
    createdAt: '2025-06-20T10:30:00Z',
    completedAt: '2025-06-21T15:45:00Z',
    requester: {
      id: 'user1',
      username: 'user1',
    },
    recipient: {
      id: 'user2',
      username: 'user2',
    },
    requestedBook: {
      title: 'TypeScript入門',
      bookTemplate: {
        title: 'TypeScript入門',
        author: '山田太郎',
      },
    },
    offeredBook: {
      title: 'React実践ガイド',
      bookTemplate: {
        title: 'React実践ガイド',
        author: '田中花子',
      },
    },
    message: 'よろしくお願いします！',
  },
  {
    id: '2',
    status: 'PENDING',
    createdAt: '2025-06-19T14:20:00Z',
    completedAt: null,
    requester: {
      id: 'user3',
      username: 'user3',
    },
    recipient: {
      id: 'user1',
      username: 'user1',
    },
    requestedBook: {
      title: 'GraphQL入門',
      bookTemplate: {
        title: 'GraphQL入門',
        author: '佐藤次郎',
      },
    },
    offeredBook: null,
    message: '交換をお願いします',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'success';
    case 'PENDING':
      return 'warning';
    case 'ACCEPTED':
      return 'info';
    case 'REJECTED':
      return 'error';
    case 'CANCELLED':
      return 'default';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return '完了';
    case 'PENDING':
      return '保留中';
    case 'ACCEPTED':
      return '承認済み';
    case 'REJECTED':
      return '拒否';
    case 'CANCELLED':
      return 'キャンセル';
    default:
      return status;
  }
};

export default function ExchangeHistoryPage() {
  const router = useRouter();
  const { id: userId } = router.query;
  const [tabValue, setTabValue] = useState(0);

  const handleGoBack = () => {
    router.back();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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

  const completedExchanges = mockExchangeHistory.filter(exchange => exchange.status === 'COMPLETED');
  const activeExchanges = mockExchangeHistory.filter(exchange => exchange.status !== 'COMPLETED');

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
          交換履歴
        </Typography>
        <Typography variant="body1" color="text.secondary">
          本の交換履歴と現在進行中の交換一覧
        </Typography>
      </Box>

      {/* 統計情報 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          交換統計
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="success.main">
                {completedExchanges.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                完了した交換
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="warning.main">
                {activeExchanges.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                進行中の交換
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h4" color="info.main">
                {mockExchangeHistory.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                総交換数
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* タブ */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`すべて (${mockExchangeHistory.length})`} />
          <Tab label={`完了 (${completedExchanges.length})`} />
          <Tab label={`進行中 (${activeExchanges.length})`} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {mockExchangeHistory.length === 0 ? (
          <Alert severity="info">
            交換履歴がありません。
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>日付</TableCell>
                  <TableCell>ステータス</TableCell>
                  <TableCell>リクエスト者</TableCell>
                  <TableCell>受信者</TableCell>
                  <TableCell>希望する本</TableCell>
                  <TableCell>提供する本</TableCell>
                  <TableCell>メッセージ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockExchangeHistory.map((exchange) => (
                  <TableRow key={exchange.id}>
                    <TableCell>
                      {new Date(exchange.createdAt).toLocaleDateString('ja-JP')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(exchange.status)}
                        color={getStatusColor(exchange.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{exchange.requester.username}</TableCell>
                    <TableCell>{exchange.recipient.username}</TableCell>
                    <TableCell>{exchange.requestedBook.title}</TableCell>
                    <TableCell>
                      {exchange.offeredBook ? exchange.offeredBook.title : '-'}
                    </TableCell>
                    <TableCell>
                      {exchange.message ? exchange.message.substring(0, 30) + '...' : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {completedExchanges.length === 0 ? (
          <Alert severity="info">
            完了した交換がありません。
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>完了日</TableCell>
                  <TableCell>リクエスト者</TableCell>
                  <TableCell>受信者</TableCell>
                  <TableCell>希望する本</TableCell>
                  <TableCell>提供する本</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {completedExchanges.map((exchange) => (
                  <TableRow key={exchange.id}>
                    <TableCell>
                      {exchange.completedAt ? new Date(exchange.completedAt).toLocaleDateString('ja-JP') : '-'}
                    </TableCell>
                    <TableCell>{exchange.requester.username}</TableCell>
                    <TableCell>{exchange.recipient.username}</TableCell>
                    <TableCell>{exchange.requestedBook.title}</TableCell>
                    <TableCell>
                      {exchange.offeredBook ? exchange.offeredBook.title : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {activeExchanges.length === 0 ? (
          <Alert severity="info">
            進行中の交換がありません。
          </Alert>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>開始日</TableCell>
                  <TableCell>ステータス</TableCell>
                  <TableCell>リクエスト者</TableCell>
                  <TableCell>受信者</TableCell>
                  <TableCell>希望する本</TableCell>
                  <TableCell>提供する本</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeExchanges.map((exchange) => (
                  <TableRow key={exchange.id}>
                    <TableCell>
                      {new Date(exchange.createdAt).toLocaleDateString('ja-JP')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(exchange.status)}
                        color={getStatusColor(exchange.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{exchange.requester.username}</TableCell>
                    <TableCell>{exchange.recipient.username}</TableCell>
                    <TableCell>{exchange.requestedBook.title}</TableCell>
                    <TableCell>
                      {exchange.offeredBook ? exchange.offeredBook.title : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>
    </Container>
  );
}