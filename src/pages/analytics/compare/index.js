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
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

import { TableWrapper } from "@/components/Analytics/Styles/Styles";
import CompareResult from "../compare/compareResult/CompareResult";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import { fetchCompareByClassesThunk, fetchCompareByCohortsThunk } from "@/redux/thunk/compareThunk";
import PageHeader from "@/components/CommonStyles/PageHeader";
import { useRouter } from 'next/router';

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

  const resetCompareState = () => {
    setSelectedSubject(initialState.selectedSubject);
    setSelectedRows(initialState.selectedRows);
    setIsComparing(initialState.isComparing);
    setCompareKey(Date.now());
  };


  const [page, setPage] = useState(1);


  const dispatch = useDispatch();
  const { compareResults, compareLoading, compareError } = useSelector((state) => state.compare);
  const { accessToken } = useSelector(state => state.auth);
  const { classes,totalRecords,loading } = useSelector((state) => state.analytics);

  const router = useRouter();

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
      if (page === 1) {
        setRows(classes);
      } else {
        setRows((prev) => [...prev, ...classes]);
      }
    }, [classes]);

    
  // const rows = useMemo(() => classes || [], [classes]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
    setSelectedRows([]);
  };

  const handleSelectRow = (rowNo) => {
    const selectedItem = rows.find(r => r.no === rowNo);
    if (!selectedItem) return;

    setSelectedRows((prev) =>
      prev.includes(rowNo) ? prev.filter((no) => no !== rowNo) : [...prev, rowNo]
    );
  };

  const isCompareEnabled = () => selectedRows.length >= 2;
    
  const handleCompareClick = async () => {
    const selectedItems = rows.filter(row => selectedRows.includes(row.no));

    if (selectedItems.length < 2) {
      alert("Cần chọn ít nhất 2 lớp để so sánh.");
      return;
    }

    try {
      const classIds = selectedItems.map(row => String(row.classId));
      const payload = { class_ids: classIds };
      await dispatch(fetchCompareByClassesThunk(payload));
      setCompareKey(Date.now()); 
      setIsComparing(true);
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu so sánh:", error);
    }
  };

  const handleBack = () => {
    resetCompareState();
  };

  useEffect(() => {
    // console.log(compareResults)
    if (compareResults && !compareLoading && !compareError) {
      setIsComparing(true);
    } else if (compareError) {
      console.error("Lỗi khi so sánh:", compareError);
      alert("Đã xảy ra lỗi khi so sánh: " + (compareError.message || ""));
    }
  }, [compareResults, compareLoading, compareError]);



  useEffect(() => {
    if (userId) {
      dispatch(fetchClassesByLecturer({ userId, page: page, amount: 10 }));
    }
  }, [dispatch, userId,page]);



  const handleLoadMore = () => {
    if (!loading && rows.length < totalRecords) {
      setPage((prev) => prev + 1);
    }
  };

  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = (e) => {
          const { scrollTop, scrollHeight, clientHeight } = e.target;
          const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
  
          if (isAtBottom && !isFetching && !loading) {
          setIsFetching(true);
          handleLoadMore();
          }
      };
  

  useEffect(() => {
        if (!loading) {
        setIsFetching(false);
        }
    }, [classes, loading]);



  if (isComparing) {
    // console.log(compareResults.data)
    return (
      <CompareResult
        key={compareKey}
        data={compareResults.data}
        mode="class"
        onBack={handleBack}
      />
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader
        title="So sánh kết quả"
        subtitle="So sánh hiệu quả học tập giữa các lớp và khóa học"
        icon="analytics"
        variant="analytics"
        stats={[
          { label: "Tổng lớp", value: rows.length },
          { label: "Đã chọn", value: selectedRows.length },
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
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel shrink>Môn học</InputLabel>
              <Select
                label="Môn học"
                value={selectedSubject}
                onChange={handleSubjectChange}
                displayEmpty
                renderValue={selected => {
                  if (!selected) {
                    return <em>Tất cả</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem value="">
                  <em>Tất cả</em>
                </MenuItem>
                {[...new Set(rows.map((item) => item.courseName))]
                  .filter(subject => subject)
                  .map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Button
              fullWidth={false}
              variant="contained"
              disabled={!isCompareEnabled()}
              onClick={handleCompareClick}
              sx={{
                minWidth: 160,
                bgcolor: '#1e3a8a',
                '&:hover': {
                  bgcolor: '#1e40af',
                },
                '&:disabled': {
                  bgcolor: '#9ca3af',
                },
              }}
            >
              So sánh ({selectedRows.length})
            </Button>
          </Grid>
        </Grid>

        {selectedRows.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Đã chọn:
            </Typography>
            {selectedRows.map((rowNo) => {
              const item = rows.find(r => r.no === rowNo);
              return item ? (
                <Chip
                  key={rowNo}
                  label={`${item.className} (${item.courseName})`}
                  size="small"
                  sx={{
                    bgcolor: '#e0e7ff',
                    color: '#3730a3',
                    fontWeight: 500,
                  }}
                />
              ) : null;
            })}
          </Box>
        )}
      </Paper>

      {/* Table */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: 2,
        }}
      >
        <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Tổng số lớp hiển thị: {totalRecords}
          </Typography>
        </Box>
        <TableWrapper className="scroll-view">
          <TableContainer 
              component={Paper}
              style={{ maxHeight: "550px", overflow: "auto" }}
              onScroll={handleScroll}
          
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >STT</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >Môn</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >Lớp</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }} >Khóa</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>Số sinh viên</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>Tỷ lệ đậu (%)</TableCell>
                  <TableCell style={{ ...headerCellStyle, textAlign: "center" }}>Chọn</TableCell>
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
                      <TableCell style={{ ...cellStyle, textAlign: "center" }} >{item.no}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.courseName}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.className}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.academicYear}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>{item.totalStudents}</TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                        <Chip
                          label={`${item.passRate}%`}
                          size="small"
                          sx={{
                            bgcolor: item.passRate >= 80 ? '#dcfce7' : item.passRate >= 60 ? '#fef3c7' : '#fee2e2',
                            color: item.passRate >= 80 ? '#166534' : item.passRate >= 60 ? '#92400e' : '#991b1b',
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell style={{ ...cellStyle, textAlign: "center" }}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.no)}
                          onChange={() => handleSelectRow(item.no)}
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: '#1e3a8a',
                          }}
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