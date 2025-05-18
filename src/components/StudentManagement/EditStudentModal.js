import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Grid,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-tabpanel-${index}`}
      aria-labelledby={`student-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function EditStudentModal({ open, onClose, student, onSave }) {
  const [tabValue, setTabValue] = useState(0);
  const [editedStudent, setEditedStudent] = useState(student);

  useEffect(() => {
    setEditedStudent(student);
  }, [student]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    if (editedStudent) {
      setEditedStudent({
        ...editedStudent,
        [field]: value,
      });
    }
  };

  const handleSave = () => {
    if (editedStudent) {
      onSave(editedStudent);
      onClose();
    }
  };

  if (!editedStudent) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: "medium" }}>
          Sửa Sinh Viên
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="student tabs"
            sx={{ px: 2 }}
          >
            <Tab
              label="THÔNG TIN CƠ BẢN"
              id="student-tab-0"
              aria-controls="student-tabpanel-0"
              sx={{
                color: tabValue === 0 ? "#2196f3" : "inherit",
                fontWeight: "medium",
              }}
            />
            <Tab
              label="ĐIỂM SINH VIÊN"
              id="student-tab-1"
              aria-controls="student-tabpanel-1"
              sx={{
                color: tabValue === 1 ? "#2196f3" : "inherit",
                fontWeight: "medium",
              }}
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  MSSV:
                </Typography>
                <TextField
                  fullWidth
                  value={editedStudent.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Họ và tên:
                </Typography>
                <TextField
                  fullWidth
                  value={editedStudent.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Môn học:
                </Typography>
                <TextField
                  fullWidth
                  value={editedStudent.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Lớp:
                </Typography>
                <TextField
                  fullWidth
                  value={editedStudent.class}
                  onChange={(e) => handleInputChange("class", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* Additional fields */}
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Thông tin A:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="Thông tin A"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Thông tin B:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="Thông tin B"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Grid container spacing={3}>
              {/* Quiz 1 */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Quiz 1:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="7.5"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {/* Quiz 2 */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Quiz 2:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="8.0"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {/* Quiz 3 */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Quiz 3:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="9.0"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Giữa kỳ */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Giữa kỳ:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="8.5"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {/* Thực hành */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Thực hành:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="8.0"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              {/* Đồ án */}
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Đồ án:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="9.0"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Cuối kỳ */}
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Cuối kỳ:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="9.0"
                  variant="outlined"
                  size="small"
                />
              </Grid>

              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Tổng kết */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  Tổng kết:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue="8.5"
                  variant="outlined"
                  size="medium"
                  InputProps={{
                    sx: { fontSize: "1.25rem", fontWeight: "bold" },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <Box
          sx={{ display: "flex", justifyContent: "space-between", p: 2, mt: 2 }}
        >
          <Button variant="outlined" onClick={onClose} sx={{ width: "48%" }}>
            ĐÓNG
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ width: "48%" }}
          >
            Sửa thông tin
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
