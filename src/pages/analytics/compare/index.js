import { useEffect, useMemo, useState } from "react";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";

import {
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
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
import CompareResult from "../compare/compareResult/CompareResult";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import { fetchCompareByClassesThunk, fetchCompareByCohortsThunk } from "@/redux/thunk/compareThunk";
import { TableWrapper } from "@/components/Analytics/Styles/Styles";
const Compare = () => {
  const [criteria, setCriteria] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isComparing, setIsComparing] = useState(false);

  const dispatch = useDispatch();
  const { compareResults, compareLoading, compareError } = useSelector((state) => state.compare);
  const { accessToken } = useSelector(state => state.auth);
  const { classes } = useSelector((state) => state.analytics);

  const cellStyle = {
    fontSize: "16px",
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "700",
  };


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
        await dispatch(fetchCompareByClassesThunk(payload));
      } else if (criteria === 'course') {
        const cohorts = selectedItems.map(row => String(row.cohort || row.academicYear || ''));
        const courseId = selectedItems[0].courseId;
        const payload = { cohorts, course_id: courseId };
        await dispatch(fetchCompareByCohortsThunk(payload));
      }
      // Sau khi fetch thành công, hiển thị phần kết quả so sánh
      setIsComparing(true);
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
    

      <Container>
      <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", justifyContent:"space-between" }}>
        
          <FormControl 
          style={{ width: "38%", minWidth: 250 }}  
          size="small">
            <InputLabel>Tiêu chí</InputLabel>
            <Select label="Tiêu chí" value={criteria} onChange={handleCriteriaChange}>
              <MenuItem value="class">Theo Lớp</MenuItem>
              <MenuItem value="course">Theo Khóa</MenuItem>
            </Select>
          </FormControl>
        

        
          <FormControl 
          style={{ width: "38%", minWidth: 250 }}  
          size="small">
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
        

        
          <Button
            style={{ width: "25%", minWidth: 250 }} 
            variant="contained"
            color="primary"
            disabled={!isCompareEnabled()}
            onClick={handleCompareClick}
          >
            So sánh
          </Button>
        
        </div>
      </Header>
      


      
        <div style={{ display: "flex", flexDirection: "column" }}>

            <span 
              style={{ 
                paddingLeft: "20px", 
                paddingTop: "20px", 
                fontSize: "20px", 
                fontWeight: "700" }}
            >
              Tổng số lớp hiển thị: {rows.length}
            </span>

          <Box position="relative">
            <TableWrapper className="scroll-view">

              <TableContainer
              
              component={Paper} 
              className="TableContainer"
              style={{ maxHeight: "550px", overflow: "auto" }}
              
              >
                <Table stickyHeader>
                  
                  <TableHead>
                    <TableRow>
                      <TableCell
                      style={{ ...headerCellStyle, textAlign: "center" }}
                      > STT </TableCell>

                      <TableCell
                      style={{ ...headerCellStyle, textAlign: "center" }}
                      > Môn </TableCell>

                      <TableCell
                      style={{ ...headerCellStyle, textAlign: "center" }}
                      > Lớp </TableCell>


                      <TableCell
                      style={{ ...headerCellStyle, textAlign: "center" }}
                      > Khóa </TableCell>


                      <TableCell
                      style={{ ...headerCellStyle, textAlign: "center" }}
                      > Số sinh viên </TableCell>


                      <TableCell
                      style={{ ...headerCellStyle, textAlign: "center" }}
                      > Tỷ lệ đậu (%) </TableCell>


                      {
                        criteria && <TableCell
                        style={{ ...headerCellStyle, textAlign: "center" }}
                        > Chọn </TableCell>
                      
                      }
                    </TableRow>
                  </TableHead>


                  <TableBody>
                    {rows
                      .filter(item => selectedSubject === "" || item.courseName === selectedSubject)
                      .map((item, index) => (
                        <TableRow
                          key={item.no}
                          // style={{
                          //   backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                          //   transition: "background-color 0.3s ease",
                          // }}
                          // onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e3f2fd")}
                          // onMouseLeave={(e) =>
                          //   (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fff" : "#f9f9f9")
                          // }
                        >
                          <TableCell
                          style={{ ...cellStyle, textAlign: "center" }}
                          >
                            {item.no}</TableCell>

                          <TableCell
                          style={{ ...cellStyle, textAlign: "center" }}
                          >
                            {item.courseName}</TableCell>

                          <TableCell
                          style={{ ...cellStyle, textAlign: "center" }}
                          >
                            {item.className}</TableCell>

                          <TableCell
                          style={{ ...cellStyle, textAlign: "center" }}
                          >
                            {item.academicYear}</TableCell>

                          <TableCell
                          style={{ ...cellStyle, textAlign: "center" }}
                          >
                            {item.totalStudents}</TableCell>

                          <TableCell
                          style={{ ...cellStyle, textAlign: "center" }}
                          >
                            {item.passRate}%</TableCell>

                          {criteria && (
                            <TableCell 
                            style={{ ...cellStyle, textAlign: "center" }}
                            >
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
            </TableWrapper>
          </Box>
        </div>
      
      </Container>
      
    
  );
};

export default Compare;