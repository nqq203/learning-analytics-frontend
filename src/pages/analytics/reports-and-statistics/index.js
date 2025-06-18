import React, { useEffect, useMemo, useState } from "react";
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

  const totalStudents = useMemo(() => { //CHẠY KHI PAGE THAY ĐỔI 3
    return rows.length || totalRecords;
  }, [rows]);

  const router = useRouter();

  const handleLoadMore = () => {
      
      if (!loading && rows.length < totalRecords) {
          setPage(prev => prev + 1);
      }
  };

  const handleSubjectChange = (event) => {
    setPage(1)
    setFilterSubject(event.target.value);
  };

  const handleClassChange = (event) => {
    setPage(1)
    setFilterClass(event.target.value);
  };

  const handleFilter = () => {
    console.log("Lọc với Môn học:", filterSubject, "và Lớp:", filterClass);
  };

  const handleSearchChange = (e) => {
    setPage(1)
    setSearch(e.target.value);
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

  useEffect(() => { //Chạy khi page thay đổi 1
    if (!userId) return;
    dispatch(
      searchClasses({
        search,
        userId,
        page: page,
        amount: 10,
        subject: filterSubject,
        className: filterClass,
      })
    );
  }, [filterSubject, filterClass,page]);

  useEffect(() => { //Set unique option
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
    
    dispatch(
      searchClasses({ search: search, userId: userId, page: 1, amount: 10 })
    );
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
              value={filterSubject}
              onChange={handleSubjectChange}
            >
              <MenuItem value="">
                <em>None</em>
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
              value={filterClass}
              onChange={handleClassChange}
            >
              <MenuItem value="">
                <em>None</em>
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
