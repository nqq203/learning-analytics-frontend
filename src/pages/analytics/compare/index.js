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
} from "@mui/material";
import CompareResult from "./CompareResult";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import { fetchCompareByClassesThunk, fetchCompareByCohortsThunk } from "@/redux/thunk/compareThunk";

const Compare = () => {
  const [criteria, setCriteria] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isComparing, setIsComparing] = useState(false);

  const dispatch = useDispatch();
  const { compareResults, compareLoading, compareError } = useSelector((state) => state.compare);
  const { accessToken } = useSelector(state => state.auth);
  const { classes } = useSelector((state) => state.analytics);

  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);

  const rows = useMemo(() => classes || [], [classes]);

  const handleCriteriaChange = (e) => {
    const newCriteria = e.target.value;
    setCriteria(newCriteria);
    setSelectedSubject("");
    setSelectedRows([]);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedRows([]);
  };

  const handleSelectRow = (rowNo) => {
    const selectedItem = rows.find(r => r.no === rowNo);
    if (!selectedItem) return;

    if (criteria === "course") {
      const courseId = selectedItem.courseId;
      const currentSelectedItems = rows.filter(r => selectedRows.includes(r.no));

      if (
        currentSelectedItems.length > 0 &&
        currentSelectedItems[0].courseId !== courseId
      ) {
        alert("Chỉ có thể chọn các lớp thuộc cùng một môn học khi so sánh theo khóa.");
        return;
      }
    }

    setSelectedRows((prev) =>
      prev.includes(rowNo) ? prev.filter((no) => no !== rowNo) : [...prev, rowNo]
    );
  };

  const isCompareEnabled = () =>
    selectedRows.length >= 2 &&
    (criteria !== "course" || new Set(selectedRows.map(no => {
      const item = rows.find(r => r.no === no);
      return item?.courseId;
    })).size === 1);

  const handleCompareClick = async () => {
    const selectedItems = rows.filter(row => selectedRows.includes(row.no));

    if (selectedItems.length < 2) {
      alert("Cần chọn ít nhất 2 lớp hoặc khóa học để so sánh.");
      return;
    }

    try {
      if (criteria === 'class') {
        const classIds = selectedItems.map(row => String(row.classId));
        const payload = { class_ids: classIds };
        console.log(payload)
        console.log(await dispatch(fetchCompareByClassesThunk(payload)))
        await dispatch(fetchCompareByClassesThunk(payload));
      } else if (criteria === 'course') {
        const cohorts = selectedItems.map(row => String(row.cohort || row.academicYear || ''));
        const courseId = selectedItems[0].courseId;
        const payload = { cohorts, course_id: courseId };
        await dispatch(fetchCompareByCohortsThunk(payload));
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu so sánh:", error);
    }
  };

  const handleBack = () => {
    setIsComparing(false);
  };

  useEffect(() => {
    console.log(compareResults)
    if (compareResults && !compareLoading && !compareError) {
      setIsComparing(true);
    } else if (compareError) {
      console.error("Lỗi khi so sánh:", compareError);
      alert("Đã xảy ra lỗi khi so sánh: " + (compareError.message || ""));
    }
  }, [compareResults, compareLoading, compareError]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchClassesByLecturer({ userId, page: 1, amount: 10 }));
    }
  }, [dispatch, userId]);

  if (isComparing) {
    console.log(compareResults.data)
    return <CompareResult data={compareResults.data} mode={criteria} onBack={handleBack} />;
  }

  return (
    <div style={{ padding: "16px" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Tiêu chí</InputLabel>
            <Select label="Tiêu chí" value={criteria} onChange={handleCriteriaChange}>
              <MenuItem value="class">Theo Lớp</MenuItem>
              <MenuItem value="course">Theo Khóa</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Môn học</InputLabel>
            <Select
              label="Môn học"
              value={selectedSubject}
              disabled={!criteria}
              onChange={handleSubjectChange}
            >
              {[...new Set(rows.map((item) => item.courseName))].map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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

      <Card style={{ marginTop: "32px" }}>
        <CardContent>
          <Typography variant="h6" style={{ padding: "16px", fontWeight: 600 }}>
            Danh sách các lớp đã dạy
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: "16px" }}>
            <Table stickyHeader size="medium" aria-label="Danh sách lớp">
              <TableHead>
                <TableRow>
                  <TableCell><strong>STT</strong></TableCell>
                  <TableCell><strong>Môn</strong></TableCell>
                  <TableCell><strong>Lớp</strong></TableCell>
                  <TableCell><strong>Khóa</strong></TableCell>
                  <TableCell><strong>Số sinh viên</strong></TableCell>
                  <TableCell><strong>Tỷ lệ đậu (%)</strong></TableCell>
                  {criteria && <TableCell><strong>Chọn</strong></TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .filter(item => selectedSubject === "" || item.courseName === selectedSubject)
                  .map((item, index) => (
                    <TableRow
                      key={item.no}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e3f2fd")}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fff" : "#f9f9f9")
                      }
                    >
                      <TableCell>{item.no}</TableCell>
                      <TableCell>{item.courseName}</TableCell>
                      <TableCell>{item.className}</TableCell>
                      <TableCell>{item.academicYear}</TableCell>
                      <TableCell>{item.totalStudents}</TableCell>
                      <TableCell>{item.passRate}%</TableCell>
                      {criteria && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(item.no)}
                            onChange={() => handleSelectRow(item.no)}
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