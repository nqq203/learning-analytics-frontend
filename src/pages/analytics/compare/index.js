import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CompareResult from "./CompareResult"; // nhớ import nhé
import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import { useDispatch, useSelector } from "react-redux";

const data = {
  course1: {
    class_name: "K01", // Hoặc tên lớp
    course_name: "Lập trình Web",
    midterm_avg: 8.5,
    practice_avg: 7.9,
    project_avg: 9.1,
    final_avg: 8.7,
    total_avg: 8.8,
    total_students: 30,
  },
  course2: {
    class_name: "K02",
    course_name: "Cơ sở dữ liệu",
    midterm_avg: 7.0,
    practice_avg: 7.5,
    project_avg: 8.0,
    final_avg: 7.3,
    total_avg: 7.6,
    total_students: 25,
  },
  course3: {
    class_name: "K03",
    course_name: "Mạng máy tính",
    midterm_avg: 6.8,
    practice_avg: 6.5,
    project_avg: 7.0,
    final_avg: 6.9,
    total_avg: 6.8,
    total_students: 20,
  },
};

const Compare = () => {
  const [criteria, setCriteria] = useState("");
  const dispatch = useDispatch();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [isComparing, setIsComparing] = useState(false); // <--- thêm dòng này
  const { totalRecords, classes } = useSelector((state) => state.analytics);
  const rows = useMemo(() => {
    return classes || [];
  }, [classes]);
  const handleCriteriaChange = (e) => {
    const newCriteria = e.target.value;
    setCriteria(newCriteria);
    setSelectedClass([]);
    setSelectedCourse([]);
  };

  const handleSelectClass = (className) => {
    setSelectedClass((prev) =>
      prev.includes(className)
        ? prev.filter((item) => item !== className)
        : [...prev, className]
    );
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse((prev) =>
      prev.includes(course)
        ? prev.filter((item) => item !== course)
        : [...prev, course]
    );
  };

  const isCompareEnabled = () => {
    if (criteria === "class") return selectedClass.length >= 2;
    if (criteria === "course") return selectedCourse.length >= 2;
    return false;
  };

  const handleCompareClick = () => {
    setIsComparing(true); // bấm nút So sánh -> chuyển qua bảng kết quả
  };

  const handleBack = () => {
    setIsComparing(false); // nút Quay lại
  };

  useEffect(() => {
    const fetchClasses = async () => {
      await dispatch(
        fetchClassesByLecturer({ userId: "I1266", page: 1, amount: 10 })
      );
    };
    fetchClasses();
  }, []);

  if (isComparing) {
    return <CompareResult data={data} mode="course" onBack={handleBack} />;
  }

  return (
    <div style={{ padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Tiêu chí so sánh
      </Typography>

      <Grid container spacing={3} alignItems="center">
        {/* Chọn tiêu chí */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Tiêu chí</InputLabel>
            <Select
              label="Tiêu chí"
              value={criteria}
              onChange={handleCriteriaChange}
            >
              <MenuItem value="class">Theo Lớp</MenuItem>
              <MenuItem value="course">Theo Khóa</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Chọn môn học */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Môn học</InputLabel>
            <Select
              label="Môn học"
              value={selectedSubject}
              disabled={!criteria}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {[...new Set(rows.map((item) => item.courseName))].map(
                (subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Nút So sánh */}
        <Grid
          item
          xs={12}
          sm={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!isCompareEnabled()}
            onClick={handleCompareClick} // gán event
          >
            So sánh
          </Button>
        </Grid>
      </Grid>

      {/* Bảng danh sách */}
      <Card style={{ marginTop: "32px" }}>
        <CardContent>
          <Typography variant="h6">Danh sách các lớp đã dạy</Typography>
          <TableContainer component={Paper} style={{ marginTop: "16px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>STT</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Môn</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Lớp</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Khóa</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Số sinh viên</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Tỷ lệ đậu (%)</strong>
                  </TableCell>
                  {criteria && (
                    <TableCell>
                      <strong>Chọn</strong>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .filter(
                    (item) =>
                      item.courseName === selectedSubject ||
                      selectedSubject === ""
                  )
                  .map((item, index) => (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                      }}
                    >
                      <TableCell>{item.no}</TableCell>
                      <TableCell>{item.courseName}</TableCell>
                      <TableCell>{item.className}</TableCell>
                      <TableCell>{item.academicYear}</TableCell>
                      <TableCell>{item.totalStudents}</TableCell>
                      <TableCell>{item.passRate}</TableCell>
                      {criteria && (
                        <TableCell>
                          {criteria === "class" ? (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedClass.includes(item.className)}
                                  onChange={() => handleSelectClass(item.className)}
                                />
                              }
                              label=""
                            />
                          ) : (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedCourse.includes(item.courseName)}
                                  onChange={() =>
                                    handleSelectCourse(item.courseName)
                                  }
                                />
                              }
                              label=""
                            />
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Compare;
