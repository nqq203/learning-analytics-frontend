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
} from "@mui/material";
import AnalyticsTable from "@/components/Analytics/Table/Table";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClassesByLecturer,
  searchClasses,
  searchStudents,
} from "@/redux/thunk/analyticsThunk";

const ClassesList = () => {
  const { totalRecords, classes } = useSelector((state) => state.analytics);
  console.log(classes);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const rows = useMemo(() => {
    return classes || [];
  }, [classes]);

  const totalStudents = useMemo(() => {
    return rows.length || totalRecords;
  }, [rows]);

  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      await dispatch(
        fetchClassesByLecturer({ userId: "I1266" , page: 1, amount: 10 })
      );
    };
    fetchClasses();
  }, []);

  const handleSearch = () => {
    dispatch(
      searchClasses({ search: search, userId: "I1266" , page: 1, amount: 10 })
    );
  };

  const columns = [
    { id: "courseName", label: "Môn học", align: "left" },
    { id: "className", label: "Lớp", align: "left" },
    { id: "academicYear", label: "Khóa", align: "center" },
    { id: "totalStudents", label: "Số sinh viên", align: "center" },
    { id: "passRate", label: "Tỷ lệ đậu (%)", align: "center" },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleViewClass = (classId) => {
    router.push(`/analytics/reports-and-statistics/${btoa(classId)}`);
  };

  return (
    <Container>
      <Header>
        <TextField
          placeholder="Môn học, Lớp, Khóa"
          variant="outlined"
          label="Tìm kiếm"
          value={search}
          onChange={handleSearchChange}
          style={{ width: "90%" }}
        />
        <ActionButton
          variant="contained"
          style={{ fontWeight: "700", fontSize: "14px" }}
          onClick={() => handleSearch()}
        >
          Tìm kiếm
        </ActionButton>
      </Header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            paddingLeft: "20px",
            paddingTop: "20px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Tổng số lớp hiển thị: {totalStudents}
        </span>
        <AnalyticsTable
          filteredRows={rows}y
          columns={columns}
          handleActions={handleViewClass}
        />
      </div>
    </Container>
  );
};

export default ClassesList;
