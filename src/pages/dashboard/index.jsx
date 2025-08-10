import {
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Divider,
  Chip,
  Avatar,
  Card,
  CircularProgress,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilter } from "@/context/FilterContext";
import {
  FilterAlt,
  School,
  TrendingUp,
  Assessment,
  Book,
  Group,
  Warning,
} from "@mui/icons-material";

import { AvgScoreChart } from "@/components/Dashboard/charts/AvgScoreChart";
import { RiskStudentChart } from "@/components/Dashboard/charts/RiskStudentChart";
import { DashboardCards } from "@/components/Dashboard/charts/DashboardCards";
import { AcademicRankChart } from "@/components/Dashboard/charts/AcademicRankChart";

import {
  fetchDashboardCardsThunk,
  fetchSummaryThunk,
} from "@/redux/thunk/dashboardThunk";
import { jwtDecode } from "jwt-decode";
import { fetchAcademicyear, fetchAllCourses } from "@/redux/thunk/dataThunk";

export default function DashboardPage() {
  const { showFilters } = useFilter();
  const dispatch = useDispatch();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { courses, academicYears } = useSelector((state) => state.data);
  const { subjects } = useSelector((state) => state.dashboard);

  const { accessToken } = useSelector((state) => state.auth);
  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(
      fetchSummaryThunk({
        instructorId: userId,
        courseId: null,
        academicYear: null,
      })
    );
    dispatch(fetchAllCourses({ instructorId: userId }));
    dispatch(fetchAcademicyear({ instructorId: userId }));
    // dispatch(fetchDashboardCardsThunk());
  }, [dispatch, userId]);

  useEffect(() => {
    if (!selectedSubject && !selectedYear) {
      dispatch(
        fetchSummaryThunk({
          instructorId: userId,
          courseId: null,
          academicYear: null,
        })
      );
      return;
    }
    dispatch(
      fetchSummaryThunk({
        instructorId: userId,
        courseId: selectedSubject,
        academicYear: selectedYear,
      })
    );
  }, [selectedSubject, selectedYear]);

  const {
    academicRankData,
    avgScoreChart,
    allGrades,
    riskStudentData,
    passFailData,
    cardsData,
    loading,
  } = useSelector((state) => state.dashboard);

  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
          color: "white",
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  mr: 2,
                  width: 56,
                  height: 56,
                }}
              >
                <School sx={{ fontSize: 28 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h3"
                  fontWeight="700"
                  sx={{
                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                    letterSpacing: "-0.02em",
                  }}
                >
                  Bảng điều khiển
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    fontWeight: 300,
                    mt: 0.5,
                  }}
                >
                  Giám sát tiến trình học tập và hiệu quả các môn học của sinh
                  viên.
                </Typography>
              </Box>
            </Box>

            {/* Selectors */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                minWidth: { xs: "100%", md: "auto" },
              }}
            >
              <FormControl
                size="small"
                sx={{
                  minWidth: 120,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255,255,255,0.8)",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.8)",
                  },
                }}
              >
                <InputLabel>Môn</InputLabel>
                <Select
                  value={selectedSubject}
                  label="Môn"
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  sx={{
                    width: "200px",
                  }}
                >
                  <MenuItem key="all" value="">
                    Tất cả
                  </MenuItem>
                  {courses?.map((course) => (
                    <MenuItem key={course.courseId} value={course.courseId}>
                      {course.courseName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{
                  minWidth: 120,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    "& fieldset": {
                      borderColor: "rgba(255,255,255,0.3)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "rgba(255,255,255,0.8)",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                  "& .MuiSelect-icon": {
                    color: "rgba(255,255,255,0.8)",
                  },
                }}
              >
                <InputLabel>Khóa</InputLabel>
                <Select
                  value={selectedYear}
                  label="Khóa"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <MenuItem key="all" value="">
                    Tất cả
                  </MenuItem>
                  {academicYears?.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/*Stats Cards */}
      {cardsData && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{
                color: "#1e293b",
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Assessment sx={{ color: "#3b82f6" }} />
              Tổng Quan
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ color: "#64748b" }}
            >
              Các số liệu chính và chỉ số hiệu suất trên tất cả các khoá học
            </Typography>
          </Box>
          <DashboardCards
            data={cardsData}
            sx={{
              border: "1px solid",
              borderColor: "#e2e8f0",
              borderRadius: 3,
            }}
          />
        </Box>
      )}

      {/* Charts */}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Top charts */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid #e2e8f0",
                borderRadius: 3,
                background: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <AcademicRankChart data={academicRankData} />
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom chart */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid #e2e8f0",
                borderRadius: 3,
                background: "white",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <AvgScoreChart
                data={avgScoreChart}
                allGrades={allGrades}
                selectedSubject={selectedSubject}
                selectedYear={selectedYear}
                subjects={subjects}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid #e2e8f0",
                borderRadius: 3,
                background: "white",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <RiskStudentChart data={passFailData} selectedSubject={selectedSubject} selectedYear={selectedYear} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
