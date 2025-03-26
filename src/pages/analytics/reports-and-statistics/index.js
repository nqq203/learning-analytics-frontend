import React, { useMemo, useState } from "react";
import { ActionButton, Container, Header } from "@/components/Analytics/Styles/Styles";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AnalyticsTable from "@/components/Analytics/Table/Table";
import { useRouter } from "next/router";

const ClassesList = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([
    { id: 1, subject: "Cơ sở dữ liệu", class: "21CLC05", department: 21, students: 50, rate: 85 },
    { id: 2, subject: "Cơ sở dữ liệu", class: "21CLC07", department: 21, students: 45, rate: 70 },
    { id: 3, subject: "Cơ sở dữ liệu", class: "22CLC01", department: 22, students: 40, rate: 85 },
    { id: 4, subject: "Cơ sở dữ liệu nâng cao", class: "21HTTT1", department: 21, students: 50, rate: 85 },
    { id: 5, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
    { id: 6, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
    { id: 7, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
    { id: 8, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
    { id: 9, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
    { id: 10, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
    { id: 11, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
    { id: 12, subject: "Cơ sở dữ liệu nâng cao", class: "22HTTT1", department: 22, students: 50, rate: 85 },
  ]);
  const totalStudents = useMemo(() => {
    return rows.length;
  }, [rows]);
  const router = useRouter();

  const columns = [
    { id: "subject", label: "Môn học", align: "left" },
    { id: "class", label: "Lớp", align: "left" },
    { id: "department", label: "Khóa", align: "center" },
    { id: "students", label: "Số sinh viên", align: "center" },
    { id: "rate", label: "Tỷ lệ đậu (%)", align: "center" },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleViewClass = (classId) => {
    router.push(`/analytics/reports-and-statistics/${btoa(classId)}`);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.subject.toLowerCase().includes(search.toLowerCase()) ||
      row.class.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Container>
      <Header>
        <FormControl style={{ width: '20%' }}>
          <InputLabel>Môn học</InputLabel>
          <Select
            // value={sortOption}
            // onChange={handleSortChange}
            label="Môn học"
          >
            <MenuItem value="identificationCode">Môn học</MenuItem>
            <MenuItem value="fullName">Lớp</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: '20%' }}>
          <InputLabel>Lớp</InputLabel>
          <Select
            // value={sortOption}
            // onChange={handleSortChange}
            label="Lớp"
          >
            <MenuItem value="identificationCode">Môn học</MenuItem>
            <MenuItem value="fullName">Lớp</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          label="Tìm kiếm"
          value={search}
          onChange={handleSearchChange}
          style={{ width: "90%" }}
        />
        <ActionButton variant="contained" style={{ fontWeight: "700", fontSize: "14px" }}>Tìm kiếm</ActionButton>
      </Header>
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        <span style={{
          paddingLeft: "20px",
          paddingTop: "20px",
          fontSize: "20px",
          fontWeight: "700",
        }}>Tổng số lớp hiển thị: {totalStudents}</span>
        <AnalyticsTable
          filteredRows={filteredRows}
          columns={columns}
          handleActions={handleViewClass} />
      </div>
    </Container>
  );
};

export default ClassesList;
