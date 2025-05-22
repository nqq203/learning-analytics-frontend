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
import CompareResult from "./CompareResult"; 
import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import { useDispatch, useSelector } from "react-redux";

const data = {
  course1: {
    class_name: "K01",
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

const fakeClasses = [
  {
    no: 1,
    courseName: "Lập trình Web",
    className: "K01",
    academicYear: "2023",
    totalStudents: 30,
    passRate: 95,
  },
  {
    no: 19,
    courseName: "Lập trình Web",
    className: "K04",
    academicYear: "2023",
    totalStudents: 28,
    passRate: 90,
  },
  {
    no: 2,
    courseName: "Lập trình Web",
    className: "K04",
    academicYear: "2024",
    totalStudents: 28,
    passRate: 90,
  },
  {
    no: 3,
    courseName: "Cơ sở dữ liệu",
    className: "K02",
    academicYear: "2023",
    totalStudents: 25,
    passRate: 80,
  },
  {
    no: 4,
    courseName: "Cơ sở dữ liệu",
    className: "K05",
    academicYear: "2024",
    totalStudents: 27,
    passRate: 85,
  },
  {
    no: 5,
    courseName: "Mạng máy tính",
    className: "K03",
    academicYear: "2023",
    totalStudents: 20,
    passRate: 75,
  },
  {
    no: 6,
    courseName: "Mạng máy tính",
    className: "K06",
    academicYear: "2024",
    totalStudents: 22,
    passRate: 78,
  },
];

const Compare = () => {
  const [criteria, setCriteria] = useState("");
  const dispatch = useDispatch();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isComparing, setIsComparing] = useState(false);
  const { totalRecords, classes } = useSelector((state) => state.analytics);

  const rows = useMemo(() => {
    return fakeClasses || [];
  }, [fakeClasses]);

  const handleCriteriaChange = (e) => {
    const newCriteria = e.target.value;
    setCriteria(newCriteria);
    setSelectedSubject("");
    setSelectedRows([]); 
  };

  const handleSelectRow = (rowNo) => {
    setSelectedRows((prev) =>
      prev.includes(rowNo)
        ? prev.filter((no) => no !== rowNo)
        : [...prev, rowNo]
    );
  };

  const isCompareEnabled = () => {
    return selectedRows.length >= 2;
  };

  const handleCompareClick = () => {
    setIsComparing(true);
  };

  const handleBack = () => {
    setIsComparing(false);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      await dispatch(
        fetchClassesByLecturer({ userId: "I1266", page: 1, amount: 10 })
      );
    };
    fetchClasses();
  }, [dispatch]);

  if (isComparing) {
    return <CompareResult data={data} mode="course" onBack={handleBack} />;
  }

  return (
    <div style={{ padding: "16px" }}>
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
            onClick={handleCompareClick}
          >
            So sánh
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <Card style={{ marginTop: "32px" }}>
        <CardContent>
          <Typography variant="h6" style={{ padding: "16px", fontWeight: 600 }}>
            Danh sách các lớp đã dạy
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: "16px" }}>
            <Table stickyHeader size="medium" aria-label="Danh sách lớp">
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
                      key={item.no}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#e3f2fd")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          index % 2 === 0 ? "#fff" : "#f9f9f9")
                      }
                    >
                      <TableCell>{item.no}</TableCell>
                      <TableCell>{item.courseName}</TableCell>
                      <TableCell>{item.className}</TableCell>
                      <TableCell>{item.academicYear}</TableCell>
                      <TableCell>{item.totalStudents}</TableCell>
                      <TableCell>{item.passRate}</TableCell>
                      {criteria && (
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedRows.includes(item.no)}
                                onChange={() => handleSelectRow(item.no)}
                              />
                            }
                            label=""
                          />
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
