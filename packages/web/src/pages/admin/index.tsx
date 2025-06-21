import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useGetAdminStatsQuery, useAdminDeleteBookMutation, useAdminUpdateBookMutation, useAdminDeleteBookTemplateMutation, useAdminUpdateBookTemplateMutation, useAdminDeleteUserMutation, useAdminUpdateUserMutation } from './query.generated';
import { AppLayout } from '../../components/Layout';

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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', condition: '', isAvailable: true });
  const [templateEditForm, setTemplateEditForm] = useState({ title: '', author: '', publisher: '', description: '' });
  const [userEditForm, setUserEditForm] = useState({ username: '', trustScore: 5.0 });

  const { data: adminStats, loading, error, refetch } = useGetAdminStatsQuery();
  const [adminDeleteBook] = useAdminDeleteBookMutation();
  const [adminUpdateBook] = useAdminUpdateBookMutation();
  const [adminDeleteBookTemplate] = useAdminDeleteBookTemplateMutation();
  const [adminUpdateBookTemplate] = useAdminUpdateBookTemplateMutation();
  const [adminDeleteUser] = useAdminDeleteUserMutation();
  const [adminUpdateUser] = useAdminUpdateUserMutation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDeleteClick = (itemId: string, item?: any) => {
    setSelectedItem(itemId);
    setSelectedBook(item);
    setDeleteDialogOpen(true);
  };

  const handleViewClick = (item: any) => {
    if (tabValue === 1) {
      // User view
      setSelectedUser(item);
    } else {
      // Book/Template view
      setSelectedBook(item);
    }
    setViewDialogOpen(true);
  };

  const handleEditClick = (item: any) => {
    if (tabValue === 1) {
      // User edit
      setSelectedUser(item);
      setUserEditForm({
        username: item.username,
        trustScore: item.trustScore || 5.0,
      });
    } else {
      // Book edit
      setSelectedBook(item);
      setEditForm({
        title: item.title,
        description: item.description || '',
        condition: item.condition || 'GOOD',
        isAvailable: item.isAvailable,
      });
    }
    setEditDialogOpen(true);
  };

  const handleTemplateEditClick = (template: any) => {
    setSelectedBook(template);
    setTemplateEditForm({
      title: template.title,
      author: template.author || '',
      publisher: template.publisher || '',
      description: template.description || '',
    });
    setEditDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    
    try {
      if (tabValue === 1) {
        // User deletion
        await adminDeleteUser({
          variables: { userId: selectedItem },
        });
      } else if (tabValue === 2) {
        // User book deletion
        await adminDeleteBook({
          variables: { bookId: selectedItem },
        });
      } else if (tabValue === 3) {
        // Book template deletion
        await adminDeleteBookTemplate({
          variables: { bookTemplateId: selectedItem },
        });
      }
      
      // Refresh data
      await refetch();
      
      setDeleteDialogOpen(false);
      setSelectedItem(null);
      setSelectedBook(null);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting:', error);
      // TODO: Show error message to user
    }
  };

  const handleEditSave = async () => {
    try {
      if (tabValue === 1) {
        // Update user
        if (!selectedUser) return;
        await adminUpdateUser({
          variables: {
            userId: selectedUser.id,
            input: {
              username: userEditForm.username,
              trustScore: userEditForm.trustScore,
            },
          },
        });
      } else if (tabValue === 2) {
        // Update user book
        if (!selectedBook) return;
        await adminUpdateBook({
          variables: {
            bookId: selectedBook.id,
            input: {
              title: editForm.title,
              description: editForm.description,
              condition: editForm.condition as any,
              isAvailable: editForm.isAvailable,
            },
          },
        });
      } else if (tabValue === 3) {
        // Update book template
        if (!selectedBook) return;
        await adminUpdateBookTemplate({
          variables: {
            bookTemplateId: selectedBook.id,
            input: {
              title: templateEditForm.title,
              author: templateEditForm.author,
              publisher: templateEditForm.publisher,
              description: templateEditForm.description,
            },
          },
        });
      }
      
      // Refresh data
      await refetch();
      
      setEditDialogOpen(false);
      setSelectedBook(null);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating:', error);
      // TODO: Show error message to user
    }
  };

  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: '管理画面' },
  ];

  if (loading) {
    return (
      <AppLayout title="管理画面" breadcrumbs={breadcrumbs}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title="管理画面" breadcrumbs={breadcrumbs}>
        <Alert severity="error">
          エラーが発生しました: {error.message}
        </Alert>
      </AppLayout>
    );
  }

  const stats = adminStats?.getAdminStats;
  const recentUsers = stats?.recentUsers || [];
  const recentBooks = stats?.recentBooks || [];
  const recentBookTemplates = stats?.recentBookTemplates || [];

  const systemSettings = [
    { key: 'maxBooksPerUser', label: 'ユーザーあたりの最大本数', value: '50', type: 'number' },
    { key: 'exchangeTimeout', label: '交換タイムアウト（日）', value: '7', type: 'number' },
    { key: 'allowRegistration', label: '新規登録を許可', value: 'true', type: 'boolean' },
    { key: 'maintenanceMode', label: 'メンテナンスモード', value: 'false', type: 'boolean' },
  ];

  return (
    <AppLayout title="管理画面" breadcrumbs={breadcrumbs}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary">
          本交換アプリケーションの管理コンソール
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<DashboardIcon />} label="ダッシュボード" />
          <Tab icon={<PeopleIcon />} label="ユーザー管理" />
          <Tab icon={<BookIcon />} label="ユーザー本管理" />
          <Tab icon={<BookIcon />} label="本マスター管理" />
          <Tab icon={<AssessmentIcon />} label="統計・レポート" />
          <Tab icon={<SettingsIcon />} label="システム設定" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <PeopleIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{stats?.totalUsers || 0}</Typography>
                    <Typography color="text.secondary">総ユーザー数</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <BookIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{stats?.totalBooks || 0}</Typography>
                    <Typography color="text.secondary">総本数</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <SecurityIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{stats?.totalExchanges || 0}</Typography>
                    <Typography color="text.secondary">総交換数</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <AssessmentIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="h4">{stats?.totalTrustReviews || 0}</Typography>
                    <Typography color="text.secondary">信頼レビュー数</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  最近のユーザー登録
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ユーザー名</TableCell>
                        <TableCell>登録日</TableCell>
                        <TableCell>ステータス</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString('ja-JP')}</TableCell>
                          <TableCell>
                            <Chip
                              label="アクティブ"
                              color="success"
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  最近追加された本
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>タイトル</TableCell>
                        <TableCell>追加日</TableCell>
                        <TableCell>ステータス</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentBooks.map((book) => (
                        <TableRow key={book.id}>
                          <TableCell>{book.title}</TableCell>
                          <TableCell>{new Date(book.createdAt).toLocaleDateString('ja-JP')}</TableCell>
                          <TableCell>
                            <Chip
                              label={book.isAvailable ? '利用可能' : '利用不可'}
                              color={book.isAvailable ? 'success' : 'info'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            ユーザー管理
          </Typography>
          <Button variant="contained" color="primary" sx={{ mb: 2 }}>
            新規ユーザー作成
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ユーザー名</TableCell>
                <TableCell>メール</TableCell>
                <TableCell>登録日</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString('ja-JP')}</TableCell>
                  <TableCell>
                    <Chip
                      label="アクティブ"
                      color="success"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleViewClick(user)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="info"
                      onClick={() => handleEditClick(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(user.id, user)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            ユーザー本管理
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            ユーザーが所有する本のインスタンスを管理します
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>タイトル</TableCell>
                <TableCell>所有者</TableCell>
                <TableCell>追加日</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentBooks.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.id}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.user.username}</TableCell>
                  <TableCell>{new Date(book.createdAt).toLocaleDateString('ja-JP')}</TableCell>
                  <TableCell>
                    <Chip
                      label={book.isAvailable ? '利用可能' : '利用不可'}
                      color={book.isAvailable ? 'success' : 'info'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleViewClick(book)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="info"
                      onClick={() => handleEditClick(book)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(book.id, book)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            本マスター管理
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            本のメタデータ（BookTemplate）を管理します
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>タイトル</TableCell>
                <TableCell>著者</TableCell>
                <TableCell>出版社</TableCell>
                <TableCell>登録日</TableCell>
                <TableCell>所有ユーザー数</TableCell>
                <TableCell>アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentBookTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.id}</TableCell>
                  <TableCell>{template.isbn}</TableCell>
                  <TableCell>{template.title}</TableCell>
                  <TableCell>{template.author || '-'}</TableCell>
                  <TableCell>{template.publisher || '-'}</TableCell>
                  <TableCell>{new Date(template.createdAt).toLocaleDateString('ja-JP')}</TableCell>
                  <TableCell>{template.bookCount}</TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleViewClick(template)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="info"
                      onClick={() => handleTemplateEditClick(template)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(template.id, template)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h6" gutterBottom>
          統計・レポート
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  月別ユーザー登録数
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    グラフ（実装予定）
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  本交換数の推移
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography color="text.secondary">
                    グラフ（実装予定）
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h6" gutterBottom>
          システム設定
        </Typography>
        <Alert severity="warning" sx={{ mb: 3 }}>
          システム設定の変更は慎重に行ってください。不適切な設定はアプリケーションの動作に影響を与える可能性があります。
        </Alert>
        <Grid container spacing={3}>
          {systemSettings.map((setting) => (
            <Grid item xs={12} md={6} key={setting.key}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {setting.label}
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={setting.value}
                    type={setting.type === 'number' ? 'number' : 'text'}
                    disabled={setting.type === 'boolean'}
                    sx={{ mb: 2 }}
                  />
                  {setting.type === 'boolean' && (
                    <Box>
                      <Chip
                        label={setting.value === 'true' ? '有効' : '無効'}
                        color={setting.value === 'true' ? 'success' : 'default'}
                      />
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    更新
                  </Button>
                  <Button size="small" color="secondary">
                    リセット
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>
          {tabValue === 1 ? 'ユーザーの削除確認' : 
           tabValue === 2 ? '本の削除確認' : 
           '本マスターの削除確認'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {tabValue === 1 ? 
              `ユーザー「${selectedBook?.username || selectedUser?.username || ''}」を削除しますか？この操作は取り消せません。` :
             tabValue === 2 ? 
              `本「${selectedBook?.title || ''}」を削除しますか？この操作は取り消せません。` :
              `本マスター「${selectedBook?.title || ''}」を削除しますか？この操作は取り消せません。`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDeleteDialogOpen(false);
            setSelectedBook(null);
            setSelectedUser(null);
          }} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            削除
          </Button>
        </DialogActions>
      </Dialog>

      {/* View User/Book/Template Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {tabValue === 1 ? 'ユーザーの詳細' : 
           tabValue === 3 ? '本マスターの詳細' : '本の詳細'}
        </DialogTitle>
        <DialogContent>
          {tabValue === 1 && selectedUser && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedUser.username}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                ID: {selectedUser.id}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                信頼スコア: {selectedUser.trustScore || 5.0}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                所有本数: {selectedUser.bookCount || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                レビュー数: {selectedUser.reviewCount || 0}
              </Typography>
            </Box>
          )}
          {tabValue !== 1 && selectedBook && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedBook.title}
              </Typography>
              {tabValue === 3 ? (
                // BookTemplate details
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    ISBN: {selectedBook.isbn}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    著者: {selectedBook.author || '-'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    出版社: {selectedBook.publisher || '-'}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedBook.description || '説明なし'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={`所有ユーザー数: ${selectedBook.bookCount || 0}`} 
                      color="info" 
                      size="small" 
                    />
                  </Box>
                </>
              ) : (
                // Book details
                <>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    所有者: {selectedBook.user?.username || '-'}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedBook.description || '説明なし'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={selectedBook.condition || 'コンディション不明'} 
                      color="info" 
                      size="small" 
                    />
                    <Chip 
                      label={selectedBook.isAvailable ? '利用可能' : '利用不可'} 
                      color={selectedBook.isAvailable ? 'success' : 'error'} 
                      size="small" 
                    />
                  </Box>
                </>
              )}
              <Typography variant="body2" color="text.secondary">
                登録日: {new Date(selectedBook.createdAt).toLocaleDateString('ja-JP')}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setViewDialogOpen(false);
            setSelectedBook(null);
            setSelectedUser(null);
          }} color="primary">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User/Book/Template Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {tabValue === 1 ? 'ユーザーの編集' :
           tabValue === 3 ? '本マスターの編集' : '本の編集'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {tabValue === 1 ? (
              // User editing form
              <>
                <TextField
                  fullWidth
                  label="ユーザー名"
                  value={userEditForm.username}
                  onChange={(e) => setUserEditForm({ ...userEditForm, username: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="信頼スコア"
                  type="number"
                  inputProps={{ min: 0, max: 10, step: 0.1 }}
                  value={userEditForm.trustScore}
                  onChange={(e) => setUserEditForm({ ...userEditForm, trustScore: parseFloat(e.target.value) || 0 })}
                />
              </>
            ) : tabValue === 3 ? (
              // BookTemplate editing form
              <>
                <TextField
                  fullWidth
                  label="タイトル"
                  value={templateEditForm.title}
                  onChange={(e) => setTemplateEditForm({ ...templateEditForm, title: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="著者"
                  value={templateEditForm.author}
                  onChange={(e) => setTemplateEditForm({ ...templateEditForm, author: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="出版社"
                  value={templateEditForm.publisher}
                  onChange={(e) => setTemplateEditForm({ ...templateEditForm, publisher: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="説明"
                  multiline
                  rows={3}
                  value={templateEditForm.description}
                  onChange={(e) => setTemplateEditForm({ ...templateEditForm, description: e.target.value })}
                />
              </>
            ) : (
              // Book editing form
              <>
                <TextField
                  fullWidth
                  label="タイトル"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="説明"
                  multiline
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                <TextField
                  fullWidth
                  label="コンディション"
                  select
                  value={editForm.condition}
                  onChange={(e) => setEditForm({ ...editForm, condition: e.target.value })}
                  SelectProps={{ native: true }}
                >
                  <option value="NEW">新品</option>
                  <option value="LIKE_NEW">ほぼ新品</option>
                  <option value="GOOD">良好</option>
                  <option value="FAIR">普通</option>
                  <option value="POOR">悪い</option>
                </TextField>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography>利用可能:</Typography>
                  <Button
                    variant={editForm.isAvailable ? 'contained' : 'outlined'}
                    color="success"
                    size="small"
                    onClick={() => setEditForm({ ...editForm, isAvailable: true })}
                  >
                    はい
                  </Button>
                  <Button
                    variant={!editForm.isAvailable ? 'contained' : 'outlined'}
                    color="error"
                    size="small"
                    onClick={() => setEditForm({ ...editForm, isAvailable: false })}
                  >
                    いいえ
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setEditDialogOpen(false);
            setSelectedBook(null);
            setSelectedUser(null);
          }} color="primary">
            キャンセル
          </Button>
          <Button onClick={handleEditSave} color="primary" variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default AdminDashboard;