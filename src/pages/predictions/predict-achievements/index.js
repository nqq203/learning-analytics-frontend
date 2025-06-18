import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import ClassTable from '@/components/ClassManagement/ClassTable';
import { clearClassList } from '@/redux/slice/dataSlice';
import { fetchAcademicyear, fetchClassList, fetchSemester } from '@/redux/thunk/dataThunk';
import ClassViewTable from '@/components/PredictionAchievements/ClassList';
import { Divider } from '@mui/material';

export default function PredictArchievement() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { accessToken } = useSelector(s => s.auth);
  const {
    classList,
    loading,
    totalRecords,
    page,
    amount,
    hasMore,
    academicYears,
    semesters
  } = useSelector(s => s.data);

  const userId = useMemo(() => {
    if (!accessToken) return null;
    try { return jwtDecode(accessToken).sub; }
    catch { return null; }
  }, [accessToken]);

  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [semFilter, setSemFilter] = useState('');

  const onView = id => {
    if (!id) return;
    router.push(`/predictions/predict-achievements/${id}`);
  };

  useEffect(() => {
    if (!userId) return;
    dispatch(clearClassList());
    dispatch(fetchClassList({
      instructorId: userId,
      page: 1,
      amount,
      search: searchTerm,
      academicYear: yearFilter,
      semester: semFilter
    }));
  }, [userId, yearFilter, semFilter]);

  const doSearch = () => {
    dispatch(clearClassList());
    dispatch(fetchClassList({
      instructorId: userId,
      page: 1,
      amount,
      search: searchTerm,
      academicYear: yearFilter,
      semester: semFilter
    }));
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchClassList({
        instructorId: userId,
        page: page + 1,
        amount,
        search: searchTerm,
        academicYear: yearFilter,
        semester: semFilter
      }));
    }
  };

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchAcademicyear({ instructorId: userId }));
    dispatch(fetchSemester({ instructorId: userId }));
  }, [userId]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Search & Filters */}
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Tìm kiếm lớp..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && doSearch()}
          size="small"
          sx={{ flex: 1, minWidth: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={doSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Khóa</InputLabel>
          <Select
            value={yearFilter}
            label="Khóa"
            onChange={e => setYearFilter(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {academicYears.map(y => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Kỳ</InputLabel>
          <Select
            value={semFilter}
            label="Kỳ"
            onChange={e => setSemFilter(e.target.value)}
          >
            <MenuItem value="">Tất cả</MenuItem>
            {semesters.map(s => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Divider
        sx={{
          my: 2,
          borderBottomWidth: 1.5,
          borderColor: '#ccc'
        }}
      />
      {/* Tổng số lớp */}
      <Box mb={2} fontWeight={600}>
        Tổng số lớp: {totalRecords}
      </Box>

      {/* Bảng lớp */}
      <Box position="relative">
        <ClassViewTable
          filteredRows={classList}
          columns={[
            { id: 'classId', label: 'ID', align: 'center' },
            { id: 'className', label: 'Tên lớp', align: 'center' },
            { id: 'courseCode', label: 'Mã khóa học', align: 'center' },
            { id: 'courseName', label: 'Tên khóa học', align: 'center' },
            { id: 'academicYear', label: 'Khóa', align: 'center' },
            { id: 'semester', label: 'Kỳ', align: 'center' },
          ]}
          onLoadMore={handleLoadMore}
          onView={onView}
        />
        {loading && (
          <Box
            position="absolute"
            inset={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(255,255,255,0.6)"
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}