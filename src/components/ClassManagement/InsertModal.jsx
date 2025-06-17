import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

// TabPanel helper
function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ p: 2 }}>{children}</Box> : null;
}

export default function InsertModal({
  Modal,
  setModal,
  // these four arrays you can pass from parent:
  faculties = [],
  majors = [],
  programs = [],
  courses = [],
  // callback to parent when pressing “Add”
  onInsert,
}) {
  const [tabIndex, setTabIndex] = useState(0);

  // form state for each entity
  const [facultyName, setFacultyName] = useState("");
  const [majorData, setMajorData] = useState({ majorName: "", facultyId: "" });
  const [programName, setProgramName] = useState("");
  const [courseData, setCourseData] = useState({
    courseName: "",
    credit: "",
    courseCode: "",
    courseType: "",
    facultyId: "",
  });
  const [classData, setClassData] = useState({
    className: "",
    semester: "",
    academicYear: "",
    numberStudent: "",
    courseId: "",
    facultyId: "",
    majorId: "",
    programId: "",
  });

  const courseTypeOptions = [
    { label: "Bắt buộc chuyên ngành", value: "BBCN" },
    { label: "Cơ sở ngành", value: "CSN" },
    { label: "Tốt nghiệp", value: "TN" },
    { label: "Tự chọn ngành", value: "TCN" },
  ];

  const isValid = useMemo(() => {
    switch (tabIndex) {
      case 0: // Lớp
        return Boolean(
          classData.className
          && classData.semester
          && classData.academicYear
          && classData.numberStudent
          && classData.courseId
          && classData.facultyId
          && classData.majorId
          && classData.programId
        );
      case 1: // Khoa
        return Boolean(facultyName.trim());
      case 2: // Chuyên ngành
        return Boolean(
          majorData.majorName.trim()
          && majorData.facultyId
        );
      case 3: // Chương trình
        return Boolean(programName.trim());
      case 4: // Khóa học
        return Boolean(
          courseData.courseName.trim()
          && courseData.credit
          && courseData.courseCode.trim()
          && courseData.courseType
          && courseData.facultyId
        );
      default:
        return false;
    }
  }, [tabIndex, facultyName, majorData, programName, courseData, classData]);

  const closeModal = () => setModal(false);

  const handleInsert = () => {
    if (!isValid) return;
    if (tabIndex === 0 && !isClassValid) {
      toast.warning("Thông tin để tạo mới lớp chưa chính xác");
      return;
    }
    // dispatch the right payload depending on tabIndex:
    switch (tabIndex) {
      case 0:
        onInsert && onInsert({ type: "class", data: classData });
        break;
      case 1:
        onInsert && onInsert({ type: "faculty", data: { facultyName } });
        break;
      case 2:
        onInsert && onInsert({ type: "major", data: majorData });
        break;
      case 3:
        onInsert && onInsert({ type: "program", data: { programName } });
        break;
      case 4:
        onInsert && onInsert({ type: "course", data: courseData });
        break;
    }
    closeModal();
  };

  const yearPattern = /^\d{4}-\d{4}$/;

  const isClassValid = useMemo(() => {
    return (
      classData.className.trim() &&
      ["1", "2", "3"].includes(classData.semester) &&
      yearPattern.test(classData.academicYear) &&
      classData.numberStudent > 0 &&
      classData.courseId &&
      classData.facultyId &&
      classData.majorId &&
      classData.programId
    );
  }, [classData]);

  const addButtonLabels = [
    "Thêm Lớp",
    "Thêm Khoa",
    "Thêm Chuyên ngành",
    "Thêm Chương trình",
    "Thêm Môn",
  ];

  return (
    <Dialog open={Modal} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "medium" }}>
          THÊM MỚI
        </Typography>
        <IconButton onClick={closeModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Tabs
        value={tabIndex}
        onChange={(e, idx) => setTabIndex(idx)}
        variant="scrollable"
      >
        <Tab label="Lớp" />
        <Tab label="Khoa" />
        <Tab label="Chuyên ngành" />
        <Tab label="Chương trình" />
        <Tab label="Khóa học" />
      </Tabs>

      <DialogContent>
        {/* === CLASS TAB === */}
        <TabPanel value={tabIndex} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tên lớp"
                fullWidth
                size="small"
                value={classData.className}
                onChange={(e) =>
                  setClassData({ ...classData, className: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Học kỳ</InputLabel>
                <Select
                  label="Học kỳ"
                  value={classData.semester}
                  onChange={e =>
                    setClassData({ ...classData, semester: e.target.value })
                  }
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Khóa (VD: 2021-2022 ...)"
                fullWidth
                size="small"
                value={classData.academicYear}
                onChange={(e) =>
                  setClassData({
                    ...classData,
                    academicYear: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tổng SV"
                type="number"
                fullWidth
                size="small"
                value={classData.numberStudent}
                onChange={(e) =>
                  setClassData({
                    ...classData,
                    numberStudent: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Khóa học</InputLabel>
                <Select
                  label="Khóa học"
                  value={classData.courseId}
                  onChange={(e) =>
                    setClassData({ ...classData, courseId: e.target.value })
                  }
                >
                  {courses.map((c) => (
                    <MenuItem key={c.courseId} value={c.courseId}>
                      {c.courseName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Khoa</InputLabel>
                <Select
                  label="Khoa"
                  value={classData.facultyId}
                  onChange={(e) =>
                    setClassData({ ...classData, facultyId: e.target.value })
                  }
                >
                  {faculties.map((f) => (
                    <MenuItem key={f.facultyId} value={f.facultyId}>
                      {f.facultyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Chuyên ngành</InputLabel>
                <Select
                  label="Chuyên ngành"
                  value={classData.majorId}
                  onChange={(e) =>
                    setClassData({ ...classData, majorId: e.target.value })
                  }
                >
                  {majors.map((m) => (
                    <MenuItem key={m.majorId} value={m.majorId}>
                      {m.majorName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Chương trình</InputLabel>
                <Select
                  label="Chương trình"
                  value={classData.programId}
                  onChange={(e) =>
                    setClassData({ ...classData, programId: e.target.value })
                  }
                >
                  {programs.map((p) => (
                    <MenuItem key={p.programId} value={p.programId}>
                      {p.programName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>

        {/* === FACULTY TAB === */}
        <TabPanel value={tabIndex} index={1}>
          <TextField
            label="Tên khoa"
            fullWidth
            size="small"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
          />
        </TabPanel>

        {/* === MAJOR TAB === */}
        <TabPanel value={tabIndex} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tên chuyên ngành"
                fullWidth
                size="small"
                value={majorData.majorName}
                onChange={(e) =>
                  setMajorData({ ...majorData, majorName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Khoa</InputLabel>
                <Select
                  label="Khoa"
                  value={majorData.facultyId}
                  onChange={(e) =>
                    setMajorData({ ...majorData, facultyId: e.target.value })
                  }
                >
                  {faculties.map((f) => (
                    <MenuItem key={f.facultyId} value={f.facultyId}>
                      {f.facultyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>

        {/* === PROGRAM TAB === */}
        <TabPanel value={tabIndex} index={3}>
          <TextField
            label="Tên chương trình"
            fullWidth
            size="small"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
          />
        </TabPanel>

        {/* === COURSE TAB === */}
        <TabPanel value={tabIndex} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tên môn"
                fullWidth
                size="small"
                value={courseData.courseName}
                onChange={(e) =>
                  setCourseData({ ...courseData, courseName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tín chỉ"
                type="number"
                fullWidth
                size="small"
                value={courseData.credit}
                onChange={(e) =>
                  setCourseData({ ...courseData, credit: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mã môn"
                fullWidth
                size="small"
                value={courseData.courseCode}
                onChange={(e) =>
                  setCourseData({ ...courseData, courseCode: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Loại môn</InputLabel>
                <Select
                  label="Loại môn"
                  value={courseData.courseType}
                  onChange={(e) =>
                    setCourseData({ ...courseData, courseType: e.target.value })
                  }
                >
                  {courseTypeOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Khoa</InputLabel>
                <Select
                  label="Khoa"
                  value={courseData.facultyId}
                  onChange={(e) =>
                    setCourseData({ ...courseData, facultyId: e.target.value })
                  }
                >
                  {faculties.map((f) => (
                    <MenuItem key={f.facultyId} value={f.facultyId}>
                      {f.facultyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>
      </DialogContent>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          borderTop: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <Button variant="outlined" onClick={closeModal}>
          Hủy
        </Button>
        <Button variant="contained" color="primary" onClick={handleInsert} disabled={!isValid}>
          {addButtonLabels[tabIndex]}
        </Button>
      </Box>
    </Dialog>
  );
}
