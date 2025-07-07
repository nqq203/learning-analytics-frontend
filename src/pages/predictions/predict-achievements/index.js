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
  Button,
  Paper,
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
import PageHeader from '@/components/CommonStyles/PageHeader';
import SearchFilters from '@/components/CommonStyles/SearchFilters';

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

  const filterOptions = [
    {
      key: "academicYear",
      label: "Khóa",
      value: yearFilter,
      options: academicYears.map(year => ({ value: year, label: year })),
      minWidth: 180,
    },
    {
      key: "semester",
      label: "Kỳ",
      value: semFilter,
      options: semesters.map(sem => ({ value: sem, label: sem })),
      minWidth: 160,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader
        title="Dự đoán thành tích"
        subtitle="Phân tích và dự đoán kết quả học tập của sinh viên"
        icon="prediction"
        variant="prediction"
        stats={[
          { label: "Tổng lớp", value: totalRecords },
          { label: "Khóa học", value: academicYears.length },
        ]}
      />

      <SearchFilters
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={doSearch}
        filters={filterOptions}
        onFilterChange={(key, value) => {
          if (key === "academicYear") {
            setYearFilter(value);
          } else if (key === "semester") {
            setSemFilter(value);
          }
        }}
        onClearFilters={() => {
          setSearchTerm("");
          setYearFilter("");
          setSemFilter("");
        }}
        searchPlaceholder="Tìm kiếm lớp..."
      />

      {/* Bảng lớp */}
      <Paper
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: 2,
        }}
      >
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
      </Paper>
    </Box>
  );
}