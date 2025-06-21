import React, { useState, ReactNode } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Container,
  Avatar,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Book as BookIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Settings as SettingsIcon,
  RateReview as ReviewIcon,
  ChevronRight as ChevronRightIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useUserQuery } from '../../pages/user/query.generated';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const DRAWER_WIDTH = 240;

const navigationItems = [
  { icon: HomeIcon, label: 'ホーム', path: '/' },
  { icon: BookIcon, label: '本の管理', path: '/book' },
  { icon: PersonIcon, label: 'プロフィール', path: '/user' },
  { icon: GroupIcon, label: 'フレンド', path: '/friend' },
  { icon: ReviewIcon, label: '交換レビュー', path: '/exchange-review' },
  { icon: AdminIcon, label: '管理画面', path: '/admin' },
];

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  breadcrumbs = [],
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { data } = useUserQuery();
  const user = data?.user;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const isCurrentPath = (path: string) => {
    if (path === '/') {
      return router.pathname === path;
    }
    return router.pathname.startsWith(path);
  };

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          BookExchange
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={isCurrentPath(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.contrastText,
                  },
                },
              }}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          ユーザー情報
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {showBackButton && (
            <IconButton
              color="inherit"
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title || 'BookExchange'}
          </Typography>
          
          {user && (
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'inherit' }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.2)' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Typography variant="body2" sx={{ color: 'inherit', fontWeight: 600 }}>
                      {user.username || 'ユーザー'}
                    </Typography>
                    <Chip 
                      label="認証済み" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(76, 175, 80, 0.8)', 
                        color: 'white',
                        fontSize: '0.7rem',
                        height: 20
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                    <Chip 
                      label="認証済み" 
                      size="small" 
                      sx={{ 
                        bgcolor: 'rgba(76, 175, 80, 0.8)', 
                        color: 'white',
                        fontSize: '0.7rem',
                        height: 20
                      }} 
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
          
          {!user && (
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" color="inherit">
                未ログイン
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />
        
        {breadcrumbs.length > 0 && (
          <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Breadcrumbs
              separator={<ChevronRightIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs.map((crumb, index) => (
                <Link
                  key={index}
                  color={index === breadcrumbs.length - 1 ? 'text.primary' : 'inherit'}
                  href={crumb.href}
                  onClick={(e) => {
                    if (crumb.href) {
                      e.preventDefault();
                      router.push(crumb.href);
                    }
                  }}
                  underline={crumb.href ? 'hover' : 'none'}
                  sx={{
                    cursor: crumb.href ? 'pointer' : 'default',
                    fontWeight: index === breadcrumbs.length - 1 ? 600 : 400,
                  }}
                >
                  {crumb.label}
                </Link>
              ))}
            </Breadcrumbs>
          </Container>
        )}

        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};