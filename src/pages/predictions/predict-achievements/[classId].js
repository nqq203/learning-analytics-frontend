// pages/classes/[id]/students.js
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { clearStudentList } from '@/redux/slice/dataSlice';
import { fetchStudentList } from '@/redux/thunk/dataThunk';
import { TableWrapper } from '@/components/Analytics/Styles/Styles';
import PredictModal from '@/components/PredictionAchievements/PredictModal';

export default function StudentListPage() {
  const router = useRouter();
  const { classId } = router.query;
  const dispatch = useDispatch();

  const { loading, studentsGrade, page, amount, hasMore } = useSelector(s => s.data);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef();

  // reload when classId or search changes
  useEffect(() => {
    if (!classId) return;
    dispatch(clearStudentList());
    dispatch(fetchStudentList({
      classId,
      type: 'summary',
      page: 1,
      amount,
      search,
    }));
    setSelected(new Set());
  }, [classId, search, dispatch, amount]);

  useEffect(() => {
    console.log("stdeutn: ", studentsGrade);
    console.log(classId)
  }, [studentsGrade, classId]);

  // infinite scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (loading || !hasMore) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
        dispatch(fetchStudentList({
          classId,
          type: 'summary',
          page: page + 1,
          amount,
          search,
        }));
      }
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [loading, hasMore, page, classId, amount, search, dispatch]);

  // toggle single
  const toggleOne = id => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // toggle all
  const allIds = useMemo(() => studentsGrade.map(s => s.studentId), [studentsGrade]);
  const toggleAll = () => {
    setSelected(prev =>
      prev.size === allIds.length
        ? new Set()
        : new Set(allIds)
    );
  };

  // navigate to predict page
  const goPredict = () => {
    if (selected.size === 0) return;
    setModalOpen(true);
  };

  const cellStyle = { fontSize: 16, textAlign: 'center' };
  const headerStyle = { ...cellStyle, fontWeight: 700 };

  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <Typography variant="h5" gutterBottom>
        Điểm sinh viên – Lớp {classId}
      </Typography>

      {/* Search + select + predict */}
      <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Tìm MSSV…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && dispatch(clearStudentList())}
          sx={{ flex: 1, minWidth: 240 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => dispatch(clearStudentList())}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={allIds.length > 0 && selected.size === allIds.length}
              indeterminate={selected.size > 0 && selected.size < allIds.length}
              onChange={toggleAll}
            />
          }
          label="Chọn tất cả"
        />

        <Button
          variant="contained"
          disabled={selected.size === 0}
          onClick={goPredict}
        >
          Dự đoán ({selected.size})
        </Button>
      </Box>

      <Divider sx={{ my: 2, borderColor: '#ccc' }} />

      {/* Grades table */}
      <TableWrapper>
        <TableContainer component={Paper} ref={containerRef} sx={{ maxHeight: 550, overflow: 'auto' }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={headerStyle}>STT</TableCell>
                <TableCell sx={headerStyle}>MSSV</TableCell>
                <TableCell sx={headerStyle}>Giữa kỳ</TableCell>
                <TableCell sx={headerStyle}>Cuối kỳ</TableCell>
                <TableCell sx={headerStyle}>Đồ án</TableCell>
                <TableCell sx={headerStyle}>Thực hành</TableCell>
                <TableCell sx={headerStyle}>Tổng kết</TableCell>
                <TableCell sx={headerStyle}>Loại ĐK</TableCell>
                <TableCell sx={headerStyle}>Trạng thái</TableCell>
                <TableCell sx={headerStyle} padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsGrade.length > 0 ? studentsGrade.map((g, idx) => (
                <TableRow hover key={g.studentId}>
                  <TableCell sx={cellStyle}>{idx + 1}</TableCell>
                  <TableCell sx={cellStyle}>{g.identificationCode}</TableCell>
                  <TableCell sx={cellStyle}>{g.midtermGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.finalGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.projectGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.practiceGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.totalGrade ?? '-'}</TableCell>
                  <TableCell sx={cellStyle}>{g.registrationType}</TableCell>
                  <TableCell sx={cellStyle}>{g.status}</TableCell>
                  <TableCell sx={cellStyle} padding="checkbox">
                    <Checkbox
                      checked={selected.has(g.studentId)}
                      onChange={() => toggleOne(g.studentId)}
                    />
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={10} align="center" sx={cellStyle}>
                    Chưa có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>

      {loading && (
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255,255,255,0.6)"
          zIndex={10}
        >
          <CircularProgress />
        </Box>
      )}
      <PredictModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        classId={classId}
        studentIds={Array.from(selected)}
      />
    </Box>
  );
}
