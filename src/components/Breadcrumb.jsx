import React from "react";
import {
    Box,
    Breadcrumbs,
    Link,
    Typography,
    Paper,
} from "@mui/material";
import {
  NavigateNext,
  Home,
  Class,
  Person,
  BarChart,
  Assessment,
  Group,
  TrendingUp,
  Security,
  School,
  Dashboard,
  Analytics,
  ManageAccounts,
  Functions,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const BreadcrumbComponent = ({ 
  breadcrumbs = [], 
  variant = 'default', // 'default', 'paper', 'minimal'
  sx = {}
}) => {
  const router = useRouter();

  const getBreadcrumbIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'dashboard':
        return <Dashboard sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'classes':
        return <Class sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'students':
        return <Person sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'charts':
        return <BarChart sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'analytics':
        return <Assessment sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'management':
        return <Group sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'prediction':
        return <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'fraud':
        return <Security sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'reports':
        return <Analytics sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'users':
        return <ManageAccounts sx={{ fontSize: 16, mr: 0.5 }} />;
      case 'functions':
        return <Functions sx={{ fontSize: 16, mr: 0.5 }} />;
      default:
        return <School sx={{ fontSize: 16, mr: 0.5 }} />;
    }
  };

  const handleBreadcrumbClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'paper':
        return {
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 1,
          boxShadow: 1,
          border: '1px solid',
          borderColor: 'divider',
        };
      case 'minimal':
        return {
          py: 1,
        };
      default:
        return {
          bgcolor: 'grey.50',
          p: 2,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200',
        };
    }
  };

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  const content = (
    <Breadcrumbs
      separator={
        <NavigateNext 
          fontSize="small" 
          sx={{ 
            color: variant === 'paper' ? 'text.secondary' : 'grey.600',
            mx: 0.5
          }} 
        />
      }
      sx={{
        '& .MuiBreadcrumbs-separator': {
          margin: '0 4px',
        },
        '& .MuiBreadcrumbs-ol': {
          flexWrap: 'wrap',
        },
      }}
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        // // console.log(crumb);
        return isLast ? (
          <Typography
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
              fontWeight: 600,
              fontSize: '0.875rem',
              flexShrink: 0,
            }}
          >
            {getBreadcrumbIcon(crumb.type)}
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={index}
            onClick={() => handleBreadcrumbClick(crumb.path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
              textDecoration: 'none',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'underline',
              },
            }}
          >
            {getBreadcrumbIcon(crumb.type)}
            {crumb.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );

  if (variant === 'minimal') {
    return (
      <Box sx={{ ...getVariantStyles(), ...sx }}>
        {content}
      </Box>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        ...getVariantStyles(),
        ...sx,
      }}
      style={{
        marginBottom: "10px",
      }}
    >
      {content}
    </Paper>
  );
};

export default BreadcrumbComponent;