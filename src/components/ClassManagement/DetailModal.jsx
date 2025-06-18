import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

/**
 * DetailModal
 * A reusable modal to display details for any entity (class, student, score, etc.)
 *
 * Props:
 *  - open: boolean
 *  - onClose: func
 *  - title: string
 *  - fields: array of { label: string, key: string, formatter?: (value, data) => string }
 *  - entityData: object (optional) fallback from Redux state at state.data._detail
 */

const DetailModal = ({ open, onClose, title, fields, entityData }) => {
  // Fallback to Redux state if entityData not passed
  const stored = useSelector(state => state.data._detail);
  const data = entityData || stored;

  if (!data || !fields?.length) return null;

  // Render primitive values and selectively format dates
  const renderValue = (value) => {
    if (value instanceof Date) {
      return format(value, 'dd/MM/yyyy HH:mm:ss');
    }
    if (typeof value === 'string') {
      // Only auto-format ISO-like date strings (e.g., "2025-06-14T17:02:18Z" or "2025-06-14 17:02:18")
      const isoPattern = /^\d{4}-\d{2}-\d{2}(T|\s)\d{2}:\d{2}:\d{2}/;
      if (isoPattern.test(value)) {
        const date = new Date(value);
        if (!isNaN(date)) {
          return format(date, 'dd/MM/yyyy HH:mm:ss');
        }
      }
    }
    // Fallback for numbers, non-date strings, null, undefined
    return value !== undefined && value !== null ? String(value) : '--';
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {fields.map(({ label, key, formatter }, idx) => {
            const rawValue = data[key];
            const display = formatter ? formatter(rawValue, data) : renderValue(rawValue);
            return (
              <Grid item xs={6} key={idx}>
                <Typography variant="subtitle2" sx={{ color: "var(--grey-700)"}}>{label}</Typography>
                <Typography variant="body1">{display}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

DetailModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      formatter: PropTypes.func,
    })
  ).isRequired,
  entityData: PropTypes.object,
};

export default DetailModal;
