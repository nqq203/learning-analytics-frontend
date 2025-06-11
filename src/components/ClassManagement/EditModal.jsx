import styled from "styled-components";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function EditModal({ Modal, setModal, fields, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [focusKey, setFocusKey] = useState(null);

  useEffect(() => {
    const initial = {};
    fields.forEach(field => initial[field.key] = field.value);
    setFormData(initial);
  }, [fields]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
    closeModal();
  };

  const closeModal = () => setModal(false);

  return (
    <Dialog open={Modal} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>Sửa Lớp</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3}>
          {fields.map(({ key, label, type, options }) => (
            <Grid item xs={12} md={6} key={key}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: focusKey === key ? 'primary.main' : 'text.primary',
                  mb: 1
                }}
              >
                {label}
              </Typography>

              {type === "select" ? (
                <Select
                  fullWidth
                  size="small"
                  value={formData[key] ?? ""}
                  onChange={e => handleChange(key, e.target.value)}
                  onFocus={() => setFocusKey(key)}
                  onBlur={() => setFocusKey(null)}
                >
                  {options.map((opt, i) => {
                    // first try opt[key] (for Id-fields), else opt.value (for courseType)
                    const optionValue = opt[key];
                    // then opt[key.replace('Id','Name')] else opt.label
                    const optionLabel = opt[key.replace("Id", "Name")] ?? opt.label;
                    return (
                      <MenuItem key={i} value={optionValue}>
                        {optionLabel}
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData[key] ?? ""}
                  onChange={e => handleChange(key, e.target.value)}
                  onFocus={() => setFocusKey(key)}
                  onBlur={() => setFocusKey(null)}
                />
              )}
            </Grid>
          ))}
        </Grid>

        <Box mt={3} display="flex" justifyContent="space-between" sx={{ gap: 2 }}>
          <Button variant="outlined" onClick={closeModal} sx={{ flex: 1 }}>
            Đóng
          </Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ flex: 1 }}>
            Sửa Thông Tin
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}