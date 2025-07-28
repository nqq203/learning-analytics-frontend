import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import ClassListLNO from "@/components/LearningOutcome/ClassListLNO";
import {
  FetchAcademicYearClass,
  fetchFilteredClasses,
} from "@/redux/thunk/learningoutcomeThunk";
import { jwtDecode } from "jwt-decode";
import PageHeader from "@/components/CommonStyles/PageHeader";
import SearchFilters from "@/components/CommonStyles/SearchFilters";
import { fetchAllCourses } from "@/redux/thunk/dataThunk";




const columns = [
  { id: "id", label: "ID Lớp", align: "center" },
  { id: "courseName", label: "Môn", align: "left" },
  { id: "className", label: "Lớp", align: "left" },
  { id: "academicYear", label: "Khóa", align: "center" },
  { id: "semester", label: "Học Kỳ", align: "center" },
  { id: "credit", label: "Tín chỉ", align: "center" },
]
const semester = [1, 2, 3];

const LearningOutcome = () => {
  const { classes, totalRecords, academicYear, loading } = useSelector((state) => state.learningoutcome);
  const { courses } = useSelector(state => state.data);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState("");
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [classID, setClassID] = useState("");
  const [page, setPage] = useState(1);
  const [amount] = useState(10);
  const [chosenAcademicYear, setChosenAcademicYear] = useState("");
  const [chosenSemester, setChosenSemester] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const { accessToken } = useSelector(state => state.auth);
  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);

  const fetchClasses = async () => {
    // setIsLoading(true);
    await dispatch(
      fetchFilteredClasses({
        userId: userId,
        page,
        amount,
        semester: chosenSemester,
        academicYear: chosenAcademicYear,
        search: searchResult
      })
    );
    // setIsLoading(false);
  };

  useEffect(() => {
    dispatch(fetchAllCourses({ instructorId: userId }));
  }, [userId]);

  const handleLoadMore = () => {
    if (!loading && rows.length < totalRecords) {
      setPage(prev => prev + 1);
    }
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  const handleSearchResult = (value) => {
    setSearchResult(value);
    setPage(1); // reset page
    setRows([]); // reset data
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchResult(searchKeyword);
    }
  };


  const handleChangeSemester = (value) => {
    setChosenSemester(value);
    setPage(1);
    setRows([]);
  };

  const handleChangeAcademicYear = (value) => {
    setChosenAcademicYear(value);
    setPage(1);
    setRows([]);
  };

  useEffect(() => {
    dispatch(FetchAcademicYearClass({ userId: userId }));
  }, [dispatch]);

  useEffect(() => {
    fetchClasses();
  }, [chosenAcademicYear, chosenSemester, page, searchResult]);

  useEffect(() => {
    if (page === 1) {
      setRows(classes);
    } else {
      setRows((prev) => [...prev, ...classes]);
    }
  }, [classes]);

  useEffect(() => {
    if (classID !== "" && typeof classID === 'object') {
      const { classId, className, courseName } = classID;
      const params = new URLSearchParams({
        className: className || '',
        courseName: courseName || ''
      });
      router.push(`/analytics/learning-outcome/student-list/${classId}?${params.toString()}`);
    } else if (classID !== "") {
      router.push(`/analytics/learning-outcome/student-list/${classID}`);
    }
  }, [classID]);

  const filterOptions = [
    {
      key: "academicYear",
      label: "Khóa",
      value: chosenAcademicYear,
      options: academicYear.map(year => ({ value: year, label: year })),
      minWidth: 180,
    },
    {
      key: "semester",
      label: "Kỳ",
      value: chosenSemester,
      options: semester.map(sem => ({ value: sem, label: sem })),
      minWidth: 160,
    },
  ];

  // Lấy danh sách môn học duy nhất từ classes
  const subjectOptions = useMemo(() => {
    if (!classes || classes.length === 0) return [];
    const seen = new Set();
    return classes.filter(item => {
      if (!item.courseName) return false;
      if (seen.has(item.courseName)) return false;
      seen.add(item.courseName);
      return true;
    });
  }, [classes]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader
        title="Kết quả học tập"
        subtitle="Phân tích và đánh giá kết quả học tập của sinh viên theo chuẩn đầu ra"
        icon="analytics"
        variant="analytics"
        stats={[
          { label: "Tổng lớp", value: totalRecords },
          { label: "Môn học", value: courses?.length },
          { label: "Năm học", value: academicYear.length },
          { label: "Kỳ học", value: semester.length },
        ]}
      />

      <SearchFilters
        searchValue={searchKeyword}
        onSearchChange={handleSearch}
        onSearch={() => handleSearchResult(searchKeyword)}
        filters={filterOptions}
        onFilterChange={(key, value) => {
          if (key === "academicYear") {
            handleChangeAcademicYear(value);
          } else if (key === "semester") {
            handleChangeSemester(value);
          }
        }}
        onClearFilters={() => {
          setSearchKeyword("");
          setSearchResult("");
          handleChangeAcademicYear("");
          handleChangeSemester("");
        }}
        searchPlaceholder="Tìm kiếm lớp, môn học..."
      />

      {/* Bảng dữ liệu */}
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
          <ClassListLNO
            TableHeader={columns}
            TableContent={rows}
            setClassID={setClassID}
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

export default LearningOutcome;
