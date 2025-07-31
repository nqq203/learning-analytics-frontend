import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  ActionButton,
  BodyWrapper,
  Container,
  Header,
  InformationItem,
  InformationWrapper,
} from "@/components/Analytics/Styles/Styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  MenuItem,
  Box,
  CircularProgress,
  InputAdornment,
  Typography,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NonInfiniteAnalyticsTable from "@/components/Analytics/Table/NonInfiniteTable";
import {
  fetchStudents,
  fetchStudentsDetails,
} from "@/redux/thunk/analyticsThunk";
import { useDispatch, useSelector } from "react-redux";

const StudentsList = () => {
  const router = useRouter();
  const { loading } = useSelector((state) => state.analytics);
  const { classId, className, courseName } = router.query;
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("studentId");
  const [buttonVariant, setButtonVariant] = useState("contained");
  const [buttonContent, setButtonContent] = useState("Chi tiết");
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [classInfo, setClassInfo] = useState({ className: "", subjectName: "" });
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!classId) return;

      if (buttonVariant === "contained") {
        const response = await dispatch(fetchStudents({ classId })).unwrap();
        setRows(response?.data?.studentList || []);

        if (response?.data?.className) {
          setClassInfo({
            className: response.data.className,
            subjectName: response.data.subjectName || "Chưa có thông tin môn học"
          });
        }

        setColumns([
          { id: "identificationCode", label: "MSSV", align: "left" },
          { id: "fullName", label: "Họ và tên", align: "left" },
          { id: "majorName", label: "Chuyên ngành", align: "left" },
          { id: "facultyName", label: "Khoa", align: "left" },
          { id: "programName", label: "Hệ đào tạo", align: "left" },
        ]);
      } else {
        const response = await dispatch(
          fetchStudentsDetails({ classId })
        ).unwrap();
        setRows(response?.data?.studentList || []);

        if (response?.data?.className) {
          setClassInfo({
            className: response.data.className,
            subjectName: response.data.subjectName || "Chưa có thông tin môn học"
          });
        }

        setColumns([
          { id: "identificationCode", label: "MSSV" },
          { id: "fullName", label: "Họ và tên" },
          { id: "midtermGrade", label: "Giữa kỳ" },
          { id: "practiceGrade", label: "Thực hành" },
          { id: "assignmentQuizGrade", label: "Quiz + Bài tập" },
          { id: "projectGrade", label: "Đồ án" },
          { id: "bonus", label: "Điểm cộng" },
          { id: "totalGrade", label: "Tổng kết" },
          { id: "finalGrade", label: "Cuối kỳ" },
          { id: "classification", label: "Xếp loại" },
        ]);
      }
    };
    fetchData();
  }, [buttonVariant, classId, dispatch]);

  // Set class info from URL parameters
  useEffect(() => {
    if (className || courseName) {
      setClassInfo({
        className: className || `Lớp ${classId}`,
        subjectName: courseName || "Chưa có thông tin môn học"
      });
    }
  }, [className, courseName, classId]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(search.trim());
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleViewClass = (studentId) => {
    router.push(`/analytics/reports-and-statistics/${classId}/${studentId}`);
  };

  const filteredRows = rows.filter((row) => {
    const name = (row.fullName ?? "").toLowerCase();
    const id = String(row.studentId ?? "").toLowerCase();
    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase())
    );
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedRows = filteredRows.sort((a, b) => {
    if (sortOption === "studentId") {
      return Number(a.studentId ?? 0) - Number(b.studentId ?? 0);
    }
    return (a.fullName ?? "").localeCompare(b.fullName ?? "");
  });

  const handleViewDetail = () => {
    if (buttonVariant === "contained") {
      setButtonContent("Tổng quan");
      setButtonVariant("outlined");
      return;
    }
    setButtonContent("Chi tiết");
    setButtonVariant("contained");
  };

  const handleClickAnalytics = () => {
    router.push(`/analytics/reports-and-statistics/${classId}/charts`);
  };

  const studentCount = sortedRows.length;
  const averageGrade =
    buttonVariant === "outlined"
      ? (
        sortedRows.reduce((sum, row) => sum + (row.totalGrade ?? 0), 0) /
        studentCount || 0
      ).toFixed(2)
      : 0;

  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#1e3a8a",
            fontWeight: 600,
            mb: 1,
          }}
        >
          {classInfo.className || `Lớp ${classId}`}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          {classInfo.subjectName}
        </Typography>
      </Paper>

      <Header style={{ alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <FormControl style={{ width: "25%", minWidth: 250 }} size="small">
            <InputLabel>Sắp xếp</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sắp xếp"
            >
              <MenuItem value="studentId">MSSV</MenuItem>
              <MenuItem value="fullName">Họ và Tên</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            label="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            style={{ width: "53%", minWidth: 200 }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ marginRight: 0, paddingRight: 0 }}
                >
                  <IconButton
                    onClick={handleSearch}
                    sx={{
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                    }}
                  >
                    <SearchIcon sx={{ color: "#1e3a8a", fontSize: "20px" }} />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { paddingRight: 0 },
            }}
          />

          <ActionButton
            variant={buttonVariant}
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
            onClick={handleViewDetail}
            $variant={buttonVariant}
          >
            {buttonContent}
          </ActionButton>
          <ActionButton
            variant="contained"
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
            onClick={handleClickAnalytics}
          >
            Biểu đồ
          </ActionButton>
        </div>
      </Header>

      <BodyWrapper>
        <InformationWrapper>
          <InformationItem>Số lượng sinh viên: {studentCount}</InformationItem>
          {averageGrade > 0 &&
            <InformationItem>
              Điểm trung bình: {buttonVariant === "outlined" ? averageGrade : "-"}
            </InformationItem>}
        </InformationWrapper>
        <Box position="relative">
          <NonInfiniteAnalyticsTable
            filteredRows={sortedRows.map((row) => ({
              ...row,
              identificationCode: row.identificationCode ?? "-",
              fullName: row.fullName ?? "-",
              midtermGrade: row.midtermGrade ?? "-",
              practiceGrade: row.practiceGrade ?? "-",
              assignmentQuizGrade: row.assignmentQuizGrade ?? "-",
              projectGrade: row.projectGrade ?? "-",
              bonus: row.bonus ?? "-",
              totalGrade: row.totalGrade ?? "-",
              finalGrade: row.finalGrade ?? "-",
              classification: row.classification ?? "Chưa đánh giá",
            }))}
            columns={columns}
            handleActions={handleViewClass}
            action={false}
          />

          {loading && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(255,255,255,0.7)"
              zIndex={10}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </BodyWrapper>
    </Container>
  );
};

export default StudentsList;
