import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Divider,
} from '@mui/material';
import { School, TrendingUp, Assessment, Group, Security } from '@mui/icons-material';
import { useRouter } from 'next/router';

const PageHeader = ({
  title,
  subtitle,
  icon,
  stats,
  actions,
  variant = 'default', // 'default', 'analytics', 'management', 'prediction'.
  url = null,
  urlText = '',
}) => {
  const router = useRouter();
  const getIconComponent = () => {
    switch (icon) {
      case 'analytics':
        return <Assessment />;
      case 'management':
        return <Group />;
      case 'prediction':
        return <TrendingUp />;
      case 'fraud':
        return <Security />;
      default:
        return <School />;
    }
  };

  const getGradient = () => {
    switch (variant) {
      case 'analytics':
        return 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
      case 'management':
        return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
      case 'prediction':
        return 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)';
      case 'fraud':
        return 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)';
      default:
        return 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
    }
  };

  const navigateTo = (url) => {
    if (url) {
      router.push(url);
    }
  }

  return (
    <Paper
      elevation={0}
      sx={{
        background: getGradient(),
        color: 'white',
        p: { xs: 3, md: 4 },
        mb: 4,
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          transform: 'translate(50%, -50%)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                mr: 2,
                width: 56,
                height: 56,
              }}
            >
              {getIconComponent()}
            </Avatar>
            <Box>
              <Typography
                variant="h3"
                fontWeight="700"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  fontWeight: 300,
                  mt: 0.5,
                }}
              >
                {subtitle}
              </Typography>
              {url && <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  fontWeight: 300,
                  mt: 0.5,
                }}
                onClick={() => navigateTo(url)}
                style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }}
              >
                {urlText}
              </Typography>}
            </Box>
          </Box>

          {actions && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {actions}
            </Box>
          )}
        </Box>

        {stats && (
          <>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 2 }} />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {stats.map((stat, index) => (
                <Chip
                  key={index}
                  label={`${stat.label}: ${stat.value}`}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontWeight: 500,
                    '& .MuiChip-label': {
                      px: 2,
                    },
                  }}
                />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default PageHeader; 