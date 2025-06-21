import React, { ReactNode } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Breadcrumbs,
  Link,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

interface SimpleLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  breadcrumbs = [],
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {showBackButton && (
            <IconButton
              color="inherit"
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title || 'BookExchange'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs sx={{ mb: 2 }}>
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
        )}

        {children}
      </Container>
    </Box>
  );
};