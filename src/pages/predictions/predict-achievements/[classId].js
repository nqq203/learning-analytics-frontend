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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function StudentListPage() {
  const router = useRouter();
  const { classId } = router.query;
  const dispatch = useDispatch();

  const { loading, studentsGrade, page, amount, hasMore } = useSelector(s => s.data);

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const containerRef = useRef();

  const [weights, setWeights] = useState({
    midterm: 25,
    final: 50,
    project: 15,
    practice: 10,
  });
  const [weightError, setWeightError] = useState('');

  const handleWeightChange = (field, value) => {
    const num = Number(value);
    setWeights(prev => ({ ...prev, [field]: isNaN(num) ? '' : num }));
  };

  const handleSaveWeights = () => {
    const total =
      Number(weights.midterm) +
      Number(weights.final) +
      Number(weights.project) +
      Number(weights.practice);
    if (total !== 100) {
      setWeightError('Tổng phần trăm phải bằng 100%');
      return;
    }
    setWeightError('');
    setWeightModalOpen(false);
  };

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
    setWeightModalOpen(true);
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
          onClick={() => setWeightModalOpen(true)}
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

      <Dialog open={weightModalOpen} onClose={() => setWeightModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Thiết lập phần trăm điểm</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Giữa kỳ (%)"
              type="number"
              value={weights.midterm}
              onChange={e => handleWeightChange('midterm', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Cuối kỳ (%)"
              type="number"
              value={weights.final}
              onChange={e => handleWeightChange('final', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Đồ án (%)"
              type="number"
              value={weights.project}
              onChange={e => handleWeightChange('project', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              label="Thực hành (%)"
              type="number"
              value={weights.practice}
              onChange={e => handleWeightChange('practice', e.target.value)}
              inputProps={{ min: 0, max: 100 }}
            />
            {weightError && (
              <Box color="error.main" fontSize={14}>{weightError}</Box>
            )}
            <Box fontSize={13} color="text.secondary">
              Tổng các phần trăm phải bằng 100%. Ví dụ: Giữa kỳ 25, Cuối kỳ 50, Đồ án 15, Thực hành 10.
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWeightModalOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={() => {
            const total = Number(weights.midterm) + Number(weights.final) + Number(weights.project) + Number(weights.practice);
            if (total !== 100) {
              setWeightError('Tổng phần trăm phải bằng 100%');
              return;
            }
            setWeightError('');
            setWeightModalOpen(false);
            setModalOpen(true);
          }}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
