import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
  InputAdornment,
  Button,
  Chip,
} from '@mui/material';
import { Search, FilterList, Clear } from '@mui/icons-material';

const SearchFilters = ({
  searchValue,
  onSearchChange,
  onSearch,
  filters = [],
  onFilterChange,
  onClearFilters,
  searchPlaceholder = "Tìm kiếm...",
  showClearButton = true,
  sx = {},
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const hasActiveFilters = filters.some(filter => filter.value && filter.value !== '');

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: '1px solid #e5e7eb',
        borderRadius: 2,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search Field */}
        <TextField
          variant="outlined"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
          sx={{
            flex: 1,
            minWidth: 300,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'white',
              '&:hover fieldset': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1e3a8a',
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onSearch}
                  sx={{
                    color: '#1e3a8a',
                    '&:hover': {
                      bgcolor: 'rgba(30, 58, 138, 0.1)',
                    },
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Filters */}
        {filters.map((filter, index) => (
          <FormControl
            key={index}
            size="small"
            sx={{
              minWidth: filter.minWidth || 180,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                '&:hover fieldset': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3a8a',
                },
              },
            }}
          >
            <InputLabel>{filter.label}</InputLabel>
            <Select
              value={filter.value || ''}
              label={filter.label}
              onChange={(e) => onFilterChange(filter.key, e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}

        {/* Clear Filters Button */}
        {showClearButton && hasActiveFilters && (
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={onClearFilters}
            sx={{
              borderColor: '#dc2626',
              color: '#dc2626',
              '&:hover': {
                borderColor: '#b91c1c',
                bgcolor: 'rgba(220, 38, 38, 0.1)',
              },
            }}
          >
            Xóa bộ lọc
          </Button>
        )}
      </Box>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {filters
            .filter(filter => filter.value && filter.value !== '')
            .map((filter, index) => (
              <Chip
                key={index}
                label={`${filter.label}: ${filter.options.find(opt => opt.value === filter.value)?.label || filter.value}`}
                onDelete={() => onFilterChange(filter.key, '')}
                sx={{
                  bgcolor: '#e0e7ff',
                  color: '#3730a3',
                  fontWeight: 500,
                  '& .MuiChip-deleteIcon': {
                    color: '#6366f1',
                    '&:hover': {
                      color: '#4f46e5',
                    },
                  },
                }}
              />
            ))}
        </Box>
      )}
    </Paper>
  );
};

export default SearchFilters; 