import React, { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  Box,
  Grid,
  Tabs,
  Tab,
  Typography,
  Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null;
}

export default function EditStudentModal({
  open,
  onClose,
  onSubmit,
  title,
  basicFields = [],
  gradeFields = [],
  assignmentFields = [],
  QuizFields = [],
  MidTermFields = [],
  FinalFields = [],
  entityData = {},
}) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({});
  const [initial, setInitial] = useState({});

  useEffect(() => {
    // gộp thông tin & điểm
    const info = entityData.studentInformation || {};
    const grade = entityData.studentGrade || {};
    const init = {};

    [...basicFields, ...gradeFields].forEach(({ key, value = '' }) => {
      // init[key] = info[key] ?? grade[key] ?? value
      init[key] = info[key] ?? grade[key] ?? value;
    });

    setFormData(init);
    setInitial(init);
  }, [basicFields, gradeFields, entityData]);

  const handleChange = (key, val) => {
    setFormData(prev => ({ ...prev, [key]: val }));
  };

  // detect any changes
  const changed = useMemo(
    () => Object.keys(formData).some(k => formData[k] !== initial[k]),
    [formData, initial]
  );

  const handleSave = () => {
    if (!changed) return;
    const payload = {};
    // console.log(formData)
    const nonGradeKeys = Object.keys(formData).filter(key => !key.endsWith('Grade'));
  
    // Kiểm tra chỉ những field không phải Grade
    const emptyField = nonGradeKeys.find(key => 
      !formData[key] || formData[key].toString().trim() === ""
    );
    
    if (emptyField) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    
    const resultPayload = {
        studentInformation: {
          fullName: formData["fullName"],
          email: formData["email"],
          identificationCode: formData["identificationCode"],
          programId: formData["programId"],
          majorId: formData["majorId"],
          facultyId: formData["facultyId"]
        },
        studentGrades:{
          totalGrade: formData["totalGrade"] ?? 0,
          midtermGrade: formData["midtermGrade"]?? 0,
          finalGrade: formData["finalGrade"]?? 0,
          projectGrade: formData["projectGrade"]?? 0,
          practiceGrade: formData["practiceGrade"]?? 0,
          assignmentQuizGrade: formData["assignmentQuizGrade"]?? 0
        }

    }


    onSubmit(entityData.studentInformation.studentId,resultPayload);
    // onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">{title}</Typography>
        <Box component={Close} onClick={onClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
          <Tab label="Thông tin cơ bản" />
          <Tab label="Điểm sinh viên" />

          {/* <Tab label="Assignment" />
          <Tab label="Quiz" />
          <Tab label="Giữa kỳ"/>
          <Tab label="Cuối kỳ"/> */}
        
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Grid container spacing={2}>
            {basicFields.map(({ key, label, type = 'text', options = [] }) => (
              <Grid item xs={6} key={key}>
                <Typography variant="subtitle2" gutterBottom>
                  {label}
                </Typography>
                {type === 'select' ? (
                  <Select
                    fullWidth
                    size="small"
                    value={formData[key] ?? ''}
                    onChange={e => handleChange(key, e.target.value)}
                  >
                    {options.map((opt, i) => (
                      <MenuItem key={i} value={opt.value ?? opt[key]}>
                        {opt.label ?? opt.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={formData[key] ?? ''}
                    onChange={e => handleChange(key, e.target.value)}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Grid container spacing={2}>
            {gradeFields.map(({ key, label }) => (
              <Grid item xs={6} key={key}>
                <Typography variant="subtitle2" gutterBottom>
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="number"              // ← cho phép chỉ nhập số
                  value={formData[key] ?? ''}
                  onChange={e => handleChange(key, e.target.value)}
                  InputProps={{              // nếu muốn chỉ số nguyên, bạn có thể thêm:
                    inputProps: { step: 0.1 } // hoặc step: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* <TabPanel value={tab} index={2}>
          <Grid container spacing={2}>

            
            {assignmentFields.map(({ key, label }) => (
              <Grid item xs={6} key={key}>
                <Typography variant="subtitle2" gutterBottom>
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="number"              // ← cho phép chỉ nhập số
                  value={formData[key] ?? ''}
                  onChange={e => handleChange(key, e.target.value)}
                  InputProps={{              // nếu muốn chỉ số nguyên, bạn có thể thêm:
                    inputProps: { step: 0.1 } // hoặc step: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tab} index={3}>
          <div style={{display:"flex", justifyContent:"flex-end"}}>

          <FormControl style={{ width: "22.5%", minWidth: 250 }} size="small">
                                <InputLabel id="academic-year-label">Chọn bài kiểm tra</InputLabel>
                                <Select
                                  labelId="academic-year-label"
                                  label="Chọn khóa"
                                  // onChange={(e) => handleChangeAcademicYear(e.target.value)}
                                >
                                  <MenuItem value="">Tất cả</MenuItem>
                                  
                                </Select>
          </FormControl>

          </div>
          <Grid container spacing={2}>
            


            {QuizFields.map(({ key, label }) => (
              <Grid item xs={6} key={key}>
                <Typography variant="subtitle2" gutterBottom>
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="number"              // ← cho phép chỉ nhập số
                  value={formData[key] ?? ''}
                  onChange={e => handleChange(key, e.target.value)}
                  InputProps={{              // nếu muốn chỉ số nguyên, bạn có thể thêm:
                    inputProps: { step: 0.1 } // hoặc step: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>


        <TabPanel value={tab} index={4}>
          <Grid container spacing={2}>
            {MidTermFields.map(({ key, label }) => (
              <Grid item xs={6} key={key}>
                <Typography variant="subtitle2" gutterBottom>
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="number"              // ← cho phép chỉ nhập số
                  value={formData[key] ?? ''}
                  onChange={e => handleChange(key, e.target.value)}
                  InputProps={{              // nếu muốn chỉ số nguyên, bạn có thể thêm:
                    inputProps: { step: 0.1 } // hoặc step: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>


        <TabPanel value={tab} index={5}>
          <Grid container spacing={2}>
            {FinalFields.map(({ key, label }) => (
              <Grid item xs={6} key={key}>
                <Typography variant="subtitle2" gutterBottom>
                  {label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="number"              // ← cho phép chỉ nhập số
                  value={formData[key] ?? ''}
                  onChange={e => handleChange(key, e.target.value)}
                  InputProps={{              // nếu muốn chỉ số nguyên, bạn có thể thêm:
                    inputProps: { step: 0.1 } // hoặc step: 1
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel> */}

        
      </DialogContent>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onClose}>Đóng</Button>
        <Button variant="contained" onClick={handleSave} disabled={!changed}>
          Cập nhật
        </Button>
      </Box>
    </Dialog>
  );
}
