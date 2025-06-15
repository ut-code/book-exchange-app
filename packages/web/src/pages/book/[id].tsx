import { useRouter } from 'next/router';
import { useState } from 'react';
import { useBooksQuery } from './query.generated';
import { 
  Typography, 
  Card, 
  CardContent, 
  Container, 
  Box,
  Grid,
  Chip,
  Button,
  IconButton,
  Divider,
  Avatar,
  Rating,
  Skeleton,
  Paper,
  Stack,
  Badge,
  Fab,
  Backdrop,
  useTheme,
  alpha,
  Zoom,
  Slide,
  Fade
} from '@mui/material';
import { 
  Favorite, 
  Share, 
  Person,
  LocationOn,
  Category,
  TrendingUp,
  AutoStories,
  SwapHoriz,
  Message,
  Timeline,
  FlashOn,
  Diamond,
  Layers
} from '@mui/icons-material';

const Book = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = typeof id === 'string' ? id : undefined;
  const theme = useTheme();
  
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'masonry'>('masonry');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const booksQuery = useBooksQuery();
  const books = booksQuery.data?.books;

  if (!stringId) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
          <Stack spacing={4}>
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 3 }} />
            <Grid container spacing={3}>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ 
                    height: 420, 
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
                  }}>
                    <Box sx={{ p: 2 }}>
                      <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: 2, mb: 2 }} />
                      <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 2 }} />
                      </Stack>
                      <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
        
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </Box>
    );
  }

  if (booksQuery.loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
          <Stack spacing={4}>
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: 3 }} />
            <Grid container spacing={3}>
              {[...Array(8)].map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card sx={{ 
                    height: 420, 
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
                  }}>
                    <Box sx={{ p: 2 }}>
                      <Skeleton variant="rectangular" width="100%" height={180} sx={{ borderRadius: 2, mb: 2 }} />
                      <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
                      <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 2 }} />
                      </Stack>
                      <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 2 }} />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
        
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </Box>
    );
  }

  const getRandomGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="xl" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Stack spacing={6}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Fade in timeout={800}>
              <Typography 
                variant="h2" 
                component="h1"
                sx={{ 
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  letterSpacing: '-0.02em'
                }}
              >
                📚 Book Exchange
              </Typography>
            </Fade>
            <Slide in direction="up" timeout={1000}>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
              >
                Discover amazing books and connect with fellow readers in our vibrant community
              </Typography>
            </Slide>
          </Box>

          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.4)} 100%)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {['All', 'Fiction', 'Non-Fiction', 'Romance', 'Mystery', 'Sci-Fi'].map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => setFilterCategory(category.toLowerCase())}
                    color={filterCategory === category.toLowerCase() ? 'primary' : 'default'}
                    variant={filterCategory === category.toLowerCase() ? 'filled' : 'outlined'}
                    sx={{ 
                      borderRadius: 3,
                      fontWeight: 600,
                      '&:hover': { transform: 'scale(1.05)' }
                    }}
                  />
                ))}
              </Stack>
              
              <Box sx={{ ml: 'auto' }}>
                <Stack direction="row" spacing={1}>
                  {[
                    { mode: 'masonry', icon: <Layers /> },
                    { mode: 'grid', icon: <Category /> },
                    { mode: 'list', icon: <Timeline /> }
                  ].map(({ mode, icon }) => (
                    <IconButton
                      key={mode}
                      onClick={() => setViewMode(mode as any)}
                      color={viewMode === mode ? 'primary' : 'default'}
                      sx={{ 
                        borderRadius: 2,
                        border: viewMode === mode ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                        '&:hover': { transform: 'scale(1.1)' }
                      }}
                    >
                      {icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>

          <Grid container spacing={4}>
            {books?.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Zoom in timeout={300 + index * 100}>
                  <Card 
                    elevation={0}
                    onClick={() => {
                      setSelectedBook(book);
                      setShowDetails(true);
                    }}
                    sx={{ 
                      height: 480,
                      borderRadius: 4,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: `0 32px 64px ${alpha(theme.palette.primary.main, 0.15)}`,
                        '& .book-cover': {
                          transform: 'scale(1.05)',
                        },
                        '& .book-actions': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        }
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <Box
                        className="book-cover"
                        sx={{
                          height: 220,
                          background: getRandomGradient(index),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          transition: 'transform 0.4s ease',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
                          }
                        }}
                      >
                        <Typography 
                          variant="h1" 
                          sx={{ 
                            fontSize: '4rem',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                            transform: 'rotate(-5deg)'
                          }}
                        >
                          📖
                        </Typography>
                        
                        <Box
                          className="book-actions"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            display: 'flex',
                            gap: 1,
                            opacity: 0,
                            transform: 'translateY(-10px)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            sx={{
                              backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              backdropFilter: 'blur(10px)',
                              color: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <Favorite fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            sx={{
                              backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              backdropFilter: 'blur(10px)',
                              color: theme.palette.secondary.main,
                              '&:hover': {
                                backgroundColor: theme.palette.secondary.main,
                                color: 'white',
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <Share fontSize="small" />
                          </IconButton>
                        </Box>

                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 12,
                            left: 12,
                            display: 'flex',
                            gap: 1
                          }}
                        >
                          <Chip 
                            icon={<FlashOn />}
                            label="Hot" 
                            size="small" 
                            color="warning"
                            sx={{ 
                              fontWeight: 600,
                              borderRadius: 2,
                              backgroundColor: alpha(theme.palette.warning.main, 0.9),
                              color: 'white'
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ p: 3, height: 'calc(100% - 220px)', display: 'flex', flexDirection: 'column' }}>
                      <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        <Box>
                          <Typography 
                            variant="h6" 
                            component="h3"
                            sx={{ 
                              fontWeight: 700,
                              mb: 1,
                              lineHeight: 1.3,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(theme.palette.primary.main, 0.8)})`,
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}
                          >
                            {book.title}
                          </Typography>
                          
                          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                            <Rating 
                              value={4.5} 
                              precision={0.5} 
                              size="small" 
                              readOnly 
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: theme.palette.warning.main,
                                }
                              }}
                            />
                            <Typography variant="body2" fontWeight="medium">
                              4.5
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              (127)
                            </Typography>
                          </Stack>
                        </Box>

                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: 1.5,
                            flexGrow: 1
                          }}
                        >
                          {book.description}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            icon={<AutoStories />}
                            label="Fiction" 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              borderRadius: 3,
                              fontWeight: 500,
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                              color: theme.palette.primary.main
                            }}
                          />
                          <Chip 
                            icon={<TrendingUp />}
                            label="Popular" 
                            size="small" 
                            color="success"
                            variant="outlined"
                            sx={{ 
                              borderRadius: 3,
                              fontWeight: 500
                            }}
                          />
                        </Box>

                        <Divider sx={{ my: 1, opacity: 0.6 }} />

                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  backgroundColor: theme.palette.success.main,
                                  border: `2px solid ${theme.palette.background.paper}`,
                                }}
                              />
                            }
                          >
                            <Avatar 
                              sx={{ 
                                width: 36, 
                                height: 36,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                              }}
                            >
                              <Person fontSize="small" />
                            </Avatar>
                          </Badge>
                          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Typography variant="body2" fontWeight="600" noWrap>
                              Reader Pro
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary" noWrap>
                                Tokyo • Online
                              </Typography>
                            </Stack>
                          </Box>
                          <IconButton 
                            size="small"
                            sx={{ 
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            <Message fontSize="small" />
                          </IconButton>
                        </Stack>

                        <Button 
                          variant="contained" 
                          fullWidth
                          startIcon={<SwapHoriz />}
                          sx={{ 
                            borderRadius: 3,
                            fontWeight: 600,
                            py: 1.5,
                            mt: 1,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            textTransform: 'none',
                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Request Exchange
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
      
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%236366f1" fill-opacity="0.1"%3E%3Cpath d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />

      <Backdrop
        sx={{ color: '#fff', zIndex: 1301 }}
        open={showDetails}
        onClick={() => setShowDetails(false)}
      >
        {selectedBook && (
          <Zoom in={showDetails}>
            <Paper
              elevation={24}
              onClick={(e) => e.stopPropagation()}
              sx={{
                maxWidth: 600,
                width: '90%',
                maxHeight: '80vh',
                overflow: 'auto',
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                backdropFilter: 'blur(20px)',
              }}
            >
              <Box sx={{ p: 4 }}>
                <Stack spacing={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                      {selectedBook.title}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Detailed Information
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      height: 200,
                      background: getRandomGradient(0),
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h1" sx={{ fontSize: '5rem' }}>
                      📚
                    </Typography>
                  </Box>
                  
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    {selectedBook.description}
                  </Typography>
                  
                  <Stack direction="row" spacing={2}>
                    <Button 
                      variant="contained" 
                      fullWidth
                      startIcon={<SwapHoriz />}
                      sx={{ borderRadius: 3, py: 1.5 }}
                    >
                      Request Exchange
                    </Button>
                    <Button 
                      variant="outlined" 
                      fullWidth
                      startIcon={<Message />}
                      sx={{ borderRadius: 3, py: 1.5 }}
                    >
                      Message Owner
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Zoom>
        )}
      </Backdrop>

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        <Diamond />
      </Fab>
    </Box>
  );
};

export default Book;
