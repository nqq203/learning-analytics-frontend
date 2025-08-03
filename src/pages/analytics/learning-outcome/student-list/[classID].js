"use client";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentListLNO from "@/components/LearningOutcome/StudentListLNO";
import { useRouter } from "next/router";
import { TextField, FormControl, InputAdornment, IconButton, Box, CircularProgress, Typography, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { fetchStudentSearch } from "@/redux/thunk/learningoutcomeThunk";
import { jwtDecode } from "jwt-decode";

import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";
import BreadcrumbComponent from "@/components/Breadcrumb";

const columns = [
  { id: "identificationCode", label: "MSSV", align: "left" },
  { id: "fullName", label: "Họ và tên", align: "left" },
  { id: "className", label: "Lớp", align: "left" },
  { id: "courseName", label: "Môn", align: "left" },
  { id: "academicYear", label: "Khóa", align: "center" },
  { id: "majorName", label: "Chuyên ngành", align: "left" },
  { id: "totalGrade", label: "Kết Quả", align: "center" },
]
const StudentContainerLNO = () => {
  const { studentsOverview, totalRecords, loading } = useSelector(state => state.learningoutcome);
  const dispatch = useDispatch();
  const router = useRouter();
  const { classID, className, courseName } = router.query;
  const [studentID, setStudentID] = useState("");
  const [amount, setAmount] = useState(10);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [classInfo, setClassInfo] = useState({ className: "", subjectName: "" });

  const [rows, setRows] = useState([]);
  const { accessToken } = useSelector(state => state.auth);
  const [decodedClassName, setDecodedClassName] = useState("");
  const [decodedCourseName, setDecodedCourseName] = useState("");

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      {
        type: 'home',
        label: 'Trang chủ',
        path: '/',
      },
      {
        type: 'analytics',
        label: 'Kết quả học tập',
        path: '/analytics/learning-outcome',
      }
    ];
    console.log("Decoded Class Name:", decodedClassName);
    console.log("Decoded Course Name:", decodedCourseName);
    if (decodedClassName && decodedCourseName) {
      breadcrumbs.push({
        type: 'students',
        label: `${decodedClassName} - ${decodedCourseName}`,
      });
    } else if (classID) {
      breadcrumbs.push({
        type: 'students',
        label: `Lớp ${classID}`,
      });
    }

    return breadcrumbs;
  };

  useEffect(() => {
    if (className)
      setDecodedClassName(className);
    if (courseName)
      setDecodedCourseName(courseName);
  }, [classID, className, courseName]);

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
    if (className || courseName) {
      setClassInfo({
        className: className || `Lớp ${classID}`,
        subjectName: courseName || "Chưa có thông tin môn học"
      });
    }
  }, [className, courseName, classID]);

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

  const fetchStudentRow = async () => {

    await dispatch(fetchStudentSearch({ userId: userId, classId: classID, page: page, amount: amount, search: searchResult }));

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchResult(searchKeyword);
    }
  };

  useEffect(() => {
    fetchStudentRow();
  }, [router, searchResult, page]);

  useEffect(() => {
    if (page === 1) {
      setRows(studentsOverview);
    } else {
      setRows(prev => [...prev, ...studentsOverview]);
    }
  }, [studentsOverview]);

  useEffect(() => {
    console.log(`Chuyển sang Students ${studentID}`);
    if (studentID !== "") {
      router.push(`/analytics/learning-outcome/student/${classID}/${studentID}`);
    }
  }, [studentID]);



  return (
    <Container>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#1e3a8a",
            fontWeight: 600,
            mb: 1,
          }}
        >
          {classInfo.className || `Lớp ${classID}`}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            fontWeight: 500,
          }}
        >
          {classInfo.subjectName}
        </Typography>
      </Paper>

      <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <TextField
            variant="outlined"
            label="Tìm kiếm"
            style={{ width: "100%" }}
            size="small"
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                    }}
                    onClick={() => handleSearchResult(searchKeyword)}
                  >
                    <SearchIcon sx={{ color: "#1e3a8a", fontSize: "20px" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              '& .MuiOutlinedInput-root': {
                paddingRight: 0,
              },
            }}
          />
        </div>
      </Header>

      {/* Breadcrumbs Navigation */}
      <BreadcrumbComponent
        breadcrumbs={getBreadcrumbs()}
        variant="default"
      />

      <Paper
        elevation={0}
        sx={{
          border: '1px solid #e5e7eb',
          borderRadius: 2,
        }}
      >
        <Box sx={{ p: 3, pb: 0 }} style={{ display: "flex", gap: "10px" }}>
          <Typography variant="h6" fontWeight={600} color="text.primary">
            Tổng số sinh viên hiển thị: {totalRecords}
          </Typography>
        </Box>
        <Box position="relative">
          <StudentListLNO
            TableContent={rows}
            TableHeader={columns}
            setStudentID={setStudentID}
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
              <CircularProgress size="50px" />
            </Box>
          )}
        </Box>
      </Paper>

    </Container>
  );
};

export default StudentContainerLNO;
