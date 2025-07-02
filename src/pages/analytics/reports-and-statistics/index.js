import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AnalyticsTable from "@/components/Analytics/Table/Table";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClassesByLecturer,
  searchClasses,
} from "@/redux/thunk/analyticsThunk";
import InputAdornment from "@mui/material/InputAdornment";
import { jwtDecode } from "jwt-decode";

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
    //CHẠY KHI PAGE THAY ĐỔI 3
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

  const handleViewClass = (classId) => {
    router.push(`/analytics/reports-and-statistics/${classId}`);
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
    console.log(filters.subject, filters.className)
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

  const columns = [
    { id: "courseName", label: "Môn học", align: "left" },
    { id: "className", label: "Lớp", align: "left" },
    { id: "academicYear", label: "Khóa", align: "center" },
    { id: "totalStudents", label: "Số sinh viên", align: "center" },
    { id: "passRate", label: "Tỷ lệ đậu (%)", align: "center" },
  ];

  return (
    <Container>
      <Header style={{ alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            label="Tìm kiếm"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            style={{ width: "55%", minWidth: 200 }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: "#1976D2",
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                      },
                    }}
                  >
                    <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                paddingRight: 0,
              },
            }}
          />

          <FormControl style={{ width: "22.5%", minWidth: 250 }} size="small">
            <InputLabel>Môn học</InputLabel>
            <Select
              label="Môn học"
              value={filters.subject}
              onChange={handleSubjectChange}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {subjectOptions.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ width: "22.5%", minWidth: 250 }} size="small">
            <InputLabel>Lớp</InputLabel>
            <Select
              label="Lớp"
              value={filters.className}
              onChange={handleClassChange}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {classOptions.map((cls) => (
                <MenuItem key={`${cls.id}-${cls.name}`} value={cls.id}>
                  {cls.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Header>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            paddingLeft: "20px",
            paddingTop: "20px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Tổng số lớp hiển thị: {totalRecords}
        </span>
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
      </div>
    </Container>
  );
};

export default ClassesList;
