import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Box,
  Button,
  IconButton,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AnalyticConfig = ({ open, onClose, onApply }) => {
  const [selectedFields, setSelectedFields] = useState({
    grades: [],
    chartTypes: [],
    otherFields: [],
    learningObjectives: [],
  });

  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const gradeOptions = [
    { key: "midtermGrade", label: "Điểm giữa kỳ" },
    { key: "finalGrade", label: "Điểm cuối kỳ" },
    { key: "totalGrade", label: "Điểm tổng kết" },
    { key: "practiceGrade", label: "Điểm thực hành" },
    { key: "projectGrade", label: "Điểm đồ án" },
  ];

  const chartOptions = [
    { key: "pie", label: "Biểu đồ tròn" },
    { key: "column", label: "Biểu đồ cột" },
    { key: "scatter", label: "Biểu đồ phân tán" },
    // { key: "histogram", label: "Biểu đồ phân phối" },
    { key: "radar", label: "Biểu đồ radar" },
  ];

  const otherOptions = [
    { key: "classification", label: "Xếp loại sinh viên" },
    { key: "passRate", label: "Tỉ lệ đậu/rớt" },
  ];

  const learningObjectiveOptions = [
    // { key: "finalExam", label: "Bài cuối kỳ" },
    { key: "assignmentQuiz", label: "Bài tập/Quiz" },
  ];

  const handleFieldChange = (e, category) => {
    const { value, checked } = e.target;
    setSelectedFields((prev) => {
      const updatedFields = { ...prev };
      const allOptions =
        category === "grades"
          ? gradeOptions.map((o) => o.key)
          : category === "chartTypes"
          ? chartOptions.map((o) => o.key)
          : category === "learningObjectives"
          ? learningObjectiveOptions.map((o) => o.key)
          : otherOptions.map((o) => o.key);

      if (value === `all${category}`) {
        updatedFields[category] = checked ? allOptions : [];
      } else {
        updatedFields[category] = checked
          ? [...updatedFields[category], value]
          : updatedFields[category].filter((item) => item !== value);
      }

      return updatedFields;
    });
  };

  useEffect(() => {
    setIsDisabledButton(
      selectedFields.chartTypes.length === 0 ||
        selectedFields.grades.length === 0
    );
  }, [selectedFields]);

  const generateChartData = () => {
    onApply(selectedFields);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Thiết lập thống kê
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
          {/* Box lớn chứa Điểm và Loại biểu đồ */}
          <Grid item xs={12} md={8} sx={{ display: 'flex' }}>
            <Paper elevation={2} sx={{ p: 2, minHeight: '400px', width: '100%' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Cấu hình biểu đồ
              </Typography>
              <Grid container spacing={2} sx={{ height: 'calc(100% - 40px)' }}>
                {/* Điểm */}
                <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Điểm
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleFieldChange(e, "grades")}
                        value="allgrades"
                        checked={selectedFields.grades.length === gradeOptions.length}
                      />
                    }
                    label="Tất cả"
                  />
                  <Divider sx={{ mb: 1 }} />
                  <FormGroup sx={{ flex: 1 }}>
                    {gradeOptions.map(({ key, label }) => (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            onChange={(e) => handleFieldChange(e, "grades")}
                            value={key}
                            checked={selectedFields.grades.includes(key)}
                          />
                        }
                        label={label}
                      />
                    ))}
                  </FormGroup>
                </Grid>

                {/* Loại biểu đồ */}
                <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Loại biểu đồ
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => handleFieldChange(e, "chartTypes")}
                        value="allchartTypes"
                        checked={selectedFields.chartTypes.length === chartOptions.length}
                      />
                    }
                    label="Tất cả"
                  />
                  <Divider sx={{ mb: 1 }} />
                  <FormGroup sx={{ flex: 1 }}>
                    {chartOptions.map(({ key, label }) => (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            onChange={(e) => handleFieldChange(e, "chartTypes")}
                            value={key}
                            checked={selectedFields.chartTypes.includes(key)}
                          />
                        }
                        label={label}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Mục tiêu học tập và Khác */}
          <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
            <Grid container spacing={2} sx={{ height: 'fit-content', width: '100%' }}>
              {[
                { title: "Mục tiêu học tập", category: "learningObjectives", options: learningObjectiveOptions },
                { title: "Khác", category: "otherFields", options: otherOptions },
              ].map(({ title, category, options }) => (
                <Grid item xs={12} key={category} sx={{ display: 'flex' }}>
                  <Paper elevation={2} sx={{ p: 2, minHeight: '190px', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {title}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => handleFieldChange(e, category)}
                          value={`all${category}`}
                          checked={
                            selectedFields[category].length === options.length
                          }
                        />
                      }
                      label="Tất cả"
                    />
                    <Divider sx={{ mb: 1 }} />
                    <FormGroup sx={{ flex: 1 }}>
                      {options.map(({ key, label }) => (
                        <FormControlLabel
                          key={key}
                          control={
                            <Checkbox
                              onChange={(e) => handleFieldChange(e, category)}
                              value={key}
                              checked={selectedFields[category].includes(key)}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </FormGroup>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          variant="contained"
          onClick={generateChartData}
          disabled={isDisabledButton}
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnalyticConfig;
