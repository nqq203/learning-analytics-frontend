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

export default function AddStudentModal({ open, onClose, subject, className, onSave }) {
  const [tabValue, setTabValue] = useState(0);

  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    subject: subject || "",
    class: className || "",
    quiz1: "",
    quiz2: "",
    quiz3: "",
    midterm: "",
    practice: "",
    project: "",
    final: "",
    total: "",
  });

  useEffect(() => {
    setNewStudent({
      id: "",
      name: "",
      subject: subject || "",
      class: className || "",
      quiz1: "",
      quiz2: "",
      quiz3: "",
      midterm: "",
      practice: "",
      project: "",
      final: "",
      total: "",
    });
     setTabValue(0); 
  }, [subject, className, open]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field, value) => {
    setNewStudent({
      ...newStudent,
      [field]: value,
    });
  };

  const handleSave = () => {
    if (onSave && typeof onSave === "function") {
      onSave(newStudent);
    }
    onClose();
  };

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
        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
          Thêm Sinh Viên Vào Lớp
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{ px: 2 }}
            aria-label="student tabs"
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
                  value={newStudent.id}
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
                  value={newStudent.name}
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
                  value={newStudent.subject}
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
                  value={newStudent.class}
                  onChange={(e) => handleInputChange("class", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Thông tin A:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Thông tin B:
                </Typography>
                <TextField fullWidth variant="outlined" size="small" />
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Grid container spacing={3}>
              {["quiz1", "quiz2", "quiz3"].map((quiz, idx) => (
                <Grid item xs={12} md={4} key={quiz}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                    Quiz {idx + 1}:
                  </Typography>
                  <TextField
                    fullWidth
                    value={newStudent[quiz]}
                    onChange={(e) => handleInputChange(quiz, e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {[
                { key: "midterm", label: "Giữa kỳ" },
                { key: "practice", label: "Thực hành" },
                { key: "project", label: "Đồ án" },
              ].map(({ key, label }) => (
                <Grid item xs={12} md={4} key={key}>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                    {label}:
                  </Typography>
                  <TextField
                    fullWidth
                    value={newStudent[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Cuối kỳ:
                </Typography>
                <TextField
                  fullWidth
                  value={newStudent.final}
                  onChange={(e) => handleInputChange("final", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                  Tổng kết:
                </Typography>
                <TextField
                  fullWidth
                  value={newStudent.total}
                  onChange={(e) => handleInputChange("total", e.target.value)}
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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            mt: 2,
          }}
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
            Thêm sinh viên
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
