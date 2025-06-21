import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Paper,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';
import { CreateExchangeReview } from './CreateExchangeReview';
import { ExchangeReviewList } from './ExchangeReviewList';
import { useRouter } from 'next/router';

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
      id={`exchange-review-tabpanel-${index}`}
      aria-labelledby={`exchange-review-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ExchangeReviewPage(): JSX.Element {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  const { exchangeRequestId, reviewedUserId } = router.query;
  
  const mockUserId = 'user-1';

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateSuccess = () => {
    setCreateDialogOpen(false);
    router.reload();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          交換レビュー
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
        >
          レビューを作成
        </Button>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="exchange review tabs">
            <Tab label="受け取ったレビュー" />
            <Tab label="書いたレビュー" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <ExchangeReviewList userId={mockUserId} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography>書いたレビューの機能は今後実装予定です</Typography>
        </TabPanel>
      </Paper>

      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          交換レビューを作成
          <IconButton
            aria-label="close"
            onClick={() => setCreateDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateExchangeReview
            exchangeRequestId={exchangeRequestId as string || 'exchange-1'}
            reviewedUserId={reviewedUserId as string || 'user-2'}
            reviewerUserId={mockUserId}
            onSuccess={handleCreateSuccess}
            onCancel={() => setCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}