import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  ActionButton,
  BodyWrapper,
  Container,
  Header,
  InformationItem,
  InformationWrapper,
} from "@/components/Analytics/Styles/Styles";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AnalyticsTable from "@/components/Analytics/Table/Table";
import {
  fetchStudents,
  fetchStudentsDetails,
} from "@/redux/thunk/analyticsThunk";
import { useDispatch } from "react-redux";

const StudentsList = () => {
  const router = useRouter();
  const { classId, pathname } = router.query;
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("studentId");
  const [buttonVariant, setButtonVariant] = useState("contained");
  const [buttonContent, setButtonContent] = useState("chi tiết");
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (!classId) return;

      if (buttonVariant === "contained") {
        const response = await dispatch(fetchStudents({ classId })).unwrap();
        setRows(response?.data?.studentList || []);
        setColumns([
          { id: "studentId", label: "MSSV", align: "left" },
          { id: "fullName", label: "Họ và tên", align: "left" },
          { id: "majorName", label: "Chuyên ngành", align: "left" },
          { id: "facultyName", label: "Khoa", align: "left" },
          { id: "programName", label: "Hệ đào tạo", align: "left" },
        ]);
      } else {
        const response = await dispatch(
          fetchStudentsDetails({ classId })
        ).unwrap();
        setRows(response?.data?.studentList || []);
        setColumns([
          { id: "studentId", label: "MSSV" },
          { id: "fullName", label: "Họ và tên" },
          { id: "midtermGrade", label: "Giữa kỳ" },
          { id: "finalGrade", label: "Cuối kỳ" },
          { id: "projectGrade", label: "Đồ án" },
          { id: "practiceGrade", label: "Thực hành" },
          { id: "totalGrade", label: "Tổng kết" },
          { id: "classification", label: "Xếp loại" },
        ]);
      }
    };
    fetchData();
  }, [buttonVariant, classId, dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleViewClass = (studentId) => {
    router.push(
      `/analytics/reports-and-statistics/${classId}/${btoa(studentId)}`
    );
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.fullName.toLowerCase().includes(search.toLowerCase()) ||
      row.studentId.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedRows = filteredRows.sort((a, b) => {
    if (sortOption === "studentId") {
      return a.studentId.localeCompare(b.studentId);
    }
    return a.fullName.localeCompare(b.fullName);
  });

  const handleViewDetail = () => {
    if (buttonVariant === "contained") {
      setButtonContent("tổng quan");
      setButtonVariant("outlined");
      return;
    }
    setButtonContent("chi tiết");
    setButtonVariant("contained");
  };

  const handleClickAnalytics = () => {
    router.push(`/analytics/reports-and-statistics/${classId}/charts`);
  };

  return (
    <Container>
      <Header>
        {/* Filter for Sorting */}
        <FormControl style={{ width: "20%" }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            label="Sắp xếp"
          >
            <MenuItem value="studentId">MSSV</MenuItem>
            <MenuItem value="fullName">Họ và Tên</MenuItem>
          </Select>
        </FormControl>
        {/* Search */}
        <TextField
          variant="outlined"
          label="Tìm kiếm"
          value={search}
          onChange={handleSearchChange}
          style={{ width: "50%" }}
        />
        <ActionButton
          variant="contained"
          style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
        >
          Tìm kiếm
        </ActionButton>
        <ActionButton
          variant={buttonVariant}
          style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
          onClick={handleViewDetail}
          $variant={buttonVariant}
        >
          {buttonContent}
        </ActionButton>
        <ActionButton
          variant="contained"
          style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}
          onClick={handleClickAnalytics}
        >
          Thống kê
        </ActionButton>
      </Header>
      <BodyWrapper>
        <InformationWrapper>
          <InformationItem>Số lượng sinh viên: {0}</InformationItem>
          <InformationItem>Điểm trung bình: {0}</InformationItem>
        </InformationWrapper>
        <AnalyticsTable
          filteredRows={sortedRows}
          columns={columns}
          handleActions={handleViewClass}
          action={false}
        />
      </BodyWrapper>
    </Container>
  );
};

export default StudentsList;
