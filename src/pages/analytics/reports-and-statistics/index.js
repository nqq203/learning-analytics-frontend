import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AnalyticsTable from "@/components/Analytics/Table/Table";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClassesByLecturer,
  searchClasses,
} from "@/redux/thunk/analyticsThunk";
import { jwtDecode } from "jwt-decode";
import PageHeader from "@/components/CommonStyles/PageHeader";
import SearchFilters from "@/components/CommonStyles/SearchFilters";
import SearchIcon from "@mui/icons-material/Search";

const ClassesList = () => {
  const { totalRecords, classes, loading } = useSelector(
    (state) => state.analytics
  );
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const { accessToken } = useSelector((state) => state.auth);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    subject: "",
    className: "",
  });

  const shouldReset = useRef(false);

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
    if (page === 1) {
      setRows(classes);
    } else {
      setRows((prev) => [...prev, ...classes]);
    }
  }, [classes]);

  const totalStudents = useMemo(() => {
    
    return rows.length || totalRecords;
  }, [rows]);

  const router = useRouter();

  const handleLoadMore = () => {
    if (!loading && rows.length < totalRecords) {
      setPage((prev) => prev + 1);
    }
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };


  const handleSubjectChange = (e) => {
    updateFilter("subject", e.target.value);
  };

  const handleClassChange = (e) => {
    updateFilter("className", e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    updateFilter("search", e.target.value);
  };

  const handleViewClass = (classId, className, courseName) => {
    const params = new URLSearchParams({
      className: className || '',
      courseName: courseName || ''
    });
    router.push(`/analytics/reports-and-statistics/${classId}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchClasses = async () => {
      await dispatch(
        fetchClassesByLecturer({ userId: userId, page: page, amount: 10 })
      );
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (!userId) return;
    
    dispatch(
      searchClasses({
        search: filters.search,
        userId,
        page: page,
        amount: 10,
        subject: filters.subject,
        className: filters.className,
      })
    );
  }, [page, filters.search, filters.subject, filters.className]);


  useEffect(() => {
    if (!rows || rows.length === 0) return;

    const subjectSet = new Set();
    const classSet = new Set();

    const uniqueSubjects = [];
    const uniqueClasses = [];

    rows.forEach((item) => {
      const subjectKey = item.courseId;
      const classKey = item.className;

      if (!subjectSet.has(subjectKey)) {
        subjectSet.add(subjectKey);
        uniqueSubjects.push({ id: item.courseId, name: item.courseName });
      }

      if (!classSet.has(classKey)) {
        classSet.add(classKey);
        uniqueClasses.push({ id: classKey, name: item.className });
      }
    });

    uniqueSubjects.sort((a, b) => a.name.localeCompare(b.name));
    uniqueClasses.sort((a, b) => a.name.localeCompare(b.name));

    setSubjectOptions(uniqueSubjects);
    setClassOptions(uniqueClasses);
  }, [rows]);

  const handleSearch = () => {
    updateFilter("search", search);
  };

  const handleClearFilters = () => {
    setSearch("");
    setFilterSubject("");
    setFilterClass("");
    setFilters({
      search: "",
      subject: "",
      className: "",
    });
  };

  const columns = [
    { id: "classId", label: "ID Lớp", align: "center" },
    { id: "courseName", label: "Môn học", align: "left" },
    { id: "className", label: "Lớp", align: "left" },
    { id: "academicYear", label: "Khóa", align: "center" },
    { id: "totalStudents", label: "Số sinh viên", align: "center" },
    { id: "passRate", label: "Tỷ lệ đậu (%)", align: "center" },
  ];

  const filterOptions = [
    {
      key: "subject",
      label: "Môn học",
      value: filterSubject,
      options: subjectOptions.map(subject => ({
        value: subject.id,
        label: subject.name
      })),
      minWidth: 200,
    },
    {
      key: "className",
      label: "Lớp",
      value: filterClass,
      options: classOptions.map(cls => ({
        value: cls.id,
        label: cls.name
      })),
      minWidth: 180,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader
        title="Thống kê & Báo cáo"
        subtitle="Phân tích dữ liệu học tập theo lớp"
        icon="analytics"
        variant="analytics"
        stats={[
          { label: "Tổng lớp", value: totalRecords },
          { label: "Môn học", value: subjectOptions.length },
        ]}
      />

      <SearchFilters
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        filters={filterOptions}
        onFilterChange={(key, value) => {
          if (key === "subject") {
            setFilterSubject(value);
            updateFilter("subject", value);
          } else if (key === "className") {
            setFilterClass(value);
            updateFilter("className", value);
          }
        }}
        onClearFilters={handleClearFilters}
        searchPlaceholder="Tìm kiếm lớp, môn học..."
      />

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
        
        <Box position="relative">
          <AnalyticsTable
            filteredRows={rows}
            columns={columns}
            handleActions={handleViewClass}
            onScrollEnd={handleLoadMore}
            loading={loading}
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
      </Paper>
    </Box>
  );
};

export default ClassesList;
