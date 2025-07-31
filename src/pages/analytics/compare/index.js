import { useEffect, useMemo, useState } from "react";
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
  TextField,
  InputAdornment,
  IconButton,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Search, FilterList, Clear } from '@mui/icons-material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TableWrapper } from "@/components/Analytics/Styles/Styles";
import CompareResult from "./compareResult/CompareResult";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import { fetchCompareByClassesThunk, fetchCompareByCohortsThunk, fetchCompareByClassNew, fetchCompareByCourse } from "@/redux/thunk/compareThunk";
import PageHeader from "@/components/CommonStyles/PageHeader";
import { useRouter } from 'next/router';
import { fetchAllCourses } from "@/redux/thunk/dataThunk";
import { useNavigate } from "react-router-dom";

const Compare = () => {
  const initialState = {
    selectedSubject: "",
    selectedRows: [],
    isComparing: false,
  };



  const [selectedSubject, setSelectedSubject] = useState(initialState.selectedSubject);
  const [selectedRows, setSelectedRows] = useState(initialState.selectedRows);
  const [isComparing, setIsComparing] = useState(initialState.isComparing);
  const [compareKey, setCompareKey] = useState(Date.now());
  const [pageKey, setPageKey] = useState(0);
  const router = useRouter();
  const { classId } = router.query;

  const resetCompareState = () => {
    setSelectedSubject(initialState.selectedSubject);
    setSelectedRows(initialState.selectedRows);
    setIsComparing(initialState.isComparing);
    setCompareKey(Date.now());
  };

  const [searchValue, setSearchValue] = useState("")
  const [searchKeyWord, setSearchKeyWord] = useState("")

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchKeyWord(searchValue)
    }
  }


  const dispatch = useDispatch();
  const { compareResults, compareLoading, compareError, loading, totalRecords, course } = useSelector((state) => state.compare);
  const { accessToken } = useSelector(state => state.auth);
  // const { classes, totalRecords, loading } = useSelector((state) => state.analytics);
  const { courses } = useSelector((state) => state.data);

  // useEffect(()=>{
  //   dispatch(fetchCompareByCourse({
  //     instructor_id:1,
  //     search:null
  //   }))

  // },[])


  // useEffect(()=>{

  //   console.log("course: ",course)
  // },[course])

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.includes('/analytics/compare')) {
        resetCompareState();
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (url.includes('/analytics/compare')) {
        resetCompareState();
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    resetCompareState();
  }, []);

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

  const [rows, setRows] = useState([]);

  useEffect(() => {

    setRows(course ?? []);

  }, [course]);


  // const rows = useMemo(() => classes || [], [classes]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCompareByCourse({ instructor_id: userId, search: searchKeyWord }));
    }
  }, [dispatch, userId, searchKeyWord]);


  const handleActions = (courseId) => {
    if (courseId)
      router.push(`/analytics/compare/${courseId}`)
  }



  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader
        title="Thống kê môn"
        subtitle="So sánh hiệu quả học tập của môn giữa các lớp và khóa học"
        icon="analytics"
        variant="analytics"
        stats={[
          { label: "Tổng môn", value: totalRecords }
          //   { label: "Môn học", value: courses?.length },
          //   { label: "Đã chọn", value: selectedRows.length },
        ]}
      />
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: '1px solid #e5e7eb',
          borderRadius: 2,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        }}
      >
        <Grid container >
          <TextField
            variant="outlined"
            placeholder="Nhập từ khóa tìm kiếm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            sx={{
              flex: 1,
              minWidth: 300,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                '&:hover fieldset': {
                  borderColor: '#3b82f6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1e3a8a',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => { setSearchKeyWord(searchValue) }}
                    sx={{
                      color: '#1e3a8a',
                      '&:hover': {
                        bgcolor: 'rgba(30, 58, 138, 0.1)',
                      },
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Paper>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: 2,
        }}
      >
        <Box sx={{ p: 3, pb: 0 }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Tổng số lớp hiển thị: {totalRecords}
          </Typography>
        </Box>
        <TableWrapper className="scroll-view">
          <TableContainer
            component={Paper}
            style={{ maxHeight: "550px", overflow: "auto" }}
          // onScroll={handleScroll}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >STT</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >ID Môn</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "left" }} >Môn</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >Loại Môn</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>Chi tiết</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .filter(item => selectedSubject === "" || item.courseName === selectedSubject)
                  .map((item, index) => (
                    <TableRow
                      key={item.no}
                      sx={{
                        '&:hover': {
                          bgcolor: 'rgba(30, 58, 138, 0.04)',
                        },
                      }}
                    >
                      <TableCell style={{ ...cellStyle, textAlign: "center" }} >{index + 1}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }} >{item.courseCode}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "left" }}>{item.courseName}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.courseType}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                        <VisibilityIcon
                          color="primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleActions(item.courseId)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </Paper>
    </Box>
  );
};

export default Compare;