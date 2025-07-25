import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
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
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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

export default function AddStudentModal({ open, onClose, subject, className, onSave,basicFields,gradeFields,instructorId }) {
  const [tabValue, setTabValue] = useState(0);
  const { loading } = useSelector(state => state.data);

  const [newStudent, setNewStudent] = useState({
      identificationCode: "",
      fullName: "",
      email:  "",
      programId: "",
      facultyId:"",
      majorId:"",
      instructorId:instructorId
  });

  const [newStudentGrade,setNewStudentGrade] =useState({
        midtermGrade: "",
        finalGrade: "",
        projectGrade: "",
        practiceGrade: "",
        assignmentQuizGrade: "",
        totalGrade: "",
  })

  
  useEffect(() => {
    setNewStudent({
        identificationCode: "",
        fullName: "",
        email:  "",
        programId: "",
        facultyId:"",
        majorId:"",
        instructorId:instructorId
        
    });


    setNewStudentGrade({
        midtermGrade: "",
        finalGrade: "",
        projectGrade:"",
        practiceGrade: "",
        assignmentQuizGrade: "",
        totalGrade: ""
    })
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


  const handleInputChangeGrade = (field, value) => {
    setNewStudentGrade({
      ...newStudentGrade,
      [field]: value,
    });
  };


  const handleSave = () => {
    const missingFields = Object.entries(newStudent).filter(([key, value]) => {
      return value === "" || value === null || value === undefined;
    });

    if (missingFields.length > 0) {
      toast.error("Vui lòng điền đầy đủ thông tin cơ bản của sinh viên.");
      setTabValue(0); 
      return;
    }
    const updatedGrades = { ...newStudentGrade };
    for (const key in updatedGrades) {
      if (updatedGrades[key] === "" || updatedGrades[key] === null || updatedGrades[key] === undefined) {
        updatedGrades[key] = 0;
      }
    }
    onSave(newStudent,updatedGrades);
    
    // onClose();
  };


  const handleCloseModal = ()=>{
    if (loading) {
      const result = confirm("Đang có request đang xử lý. Bạn có chắc chắn muốn thoát không?");
      if (result) {
        onClose();
      }
    } else {
      onClose();
    }
  }

  
  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
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
        <IconButton onClick={handleCloseModal} aria-label="close">
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


              {basicFields.map(({ key, label, type = 'text', options = [] }) => (
                            <Grid item xs={6} key={key}>
                              <Typography variant="subtitle2" gutterBottom>
                                {label}
                              </Typography>
                              {type === 'select' ? (
                                <Select
                                  fullWidth
                                  size="small"
                                  value={newStudent[key]?? ''}
                                  onChange={(e) => handleInputChange(key, e.target.value)}
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
                                  value={newStudent[key] ?? ''}
                                  onChange={(e) => handleInputChange(key, e.target.value)}
                                />
                              )}
                            </Grid>
                          ))}
              {/* {

                basicFields.map((item)=>{
                  return <Grid item xs={12} md={6}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {item.label}
                            </Typography>
                            <TextField
                              fullWidth
                              value={newStudent.id}
                              onChange={(e) => handleInputChange(item.key, e.target.value)}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>

                })
              } */}

            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 2, pb: 2 }}>
            <Grid container spacing={2}>
                {

                gradeFields.map(({ key, label })=>{
                  return <Grid item xs={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              {label}
                            </Typography>
                            <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                              type="number"
                              value={newStudentGrade[key]??''}
                              onChange={(e) => handleInputChangeGrade(key, e.target.value)}
                              // InputProps={{              // nếu muốn chỉ số nguyên, bạn có thể thêm:
                              //   inputProps: { step: 0.1 } // hoặc step: 1
                              // }}
                            />
                          </Grid>

                })
              }
              

              
            </Grid>
          </Box>
        </TabPanel>

        <Box
          sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
        >
          <Button variant="outlined" onClick={onClose} >
            Đóng
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            
          >
            Thêm sinh viên
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
