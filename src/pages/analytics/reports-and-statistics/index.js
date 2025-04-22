import React, { useEffect, useMemo, useState } from "react";
<<<<<<< HEAD
import { ActionButton, Container, Header } from "@/components/Analytics/Styles/Styles";
import { TextField, FormControl, InputLabel, MenuItem, Select, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; 
import FilterAltIcon from '@mui/icons-material/FilterAlt'; 
import AnalyticsTable from "@/components/Analytics/Table/Table";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import InputAdornment from '@mui/material/InputAdornment';
=======
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
>>>>>>> main

const ClassesList = () => {
  const { totalRecords, classes } = useSelector((state) => state.analytics);
  console.log(classes);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

<<<<<<< HEAD
  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");

  const handleSubjectChange = (event) => {
    setFilterSubject(event.target.value);
  };

  const handleClassChange = (event) => {
    setFilterClass(event.target.value);
  };
  const handleFilter = () => {
    console.log("Lọc với Môn học:", filterSubject, "và Lớp:", filterClass);
  };
=======
>>>>>>> main
  const rows = useMemo(() => {
    return classes || [];
  }, [classes]);

  const totalStudents = useMemo(() => {
    return rows.length || totalRecords;
  }, [rows]);

  const router = useRouter();

  const handleSearch = () => {
    console.log("Searching for:", subject);
  };

  useEffect(() => {
    const fetchClasses = async () => {
<<<<<<< HEAD
      await dispatch(fetchClassesByLecturer({ userId: 1, page: 1, amount: 10 }));
=======
      await dispatch(
        fetchClassesByLecturer({ userId: 83, page: 1, amount: 10 })
      );
>>>>>>> main
    };
    fetchClasses();
  }, []);

  const handleSearch = () => {
    dispatch(
      searchClasses({ search: search, userId: 83, page: 1, amount: 10 })
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
<<<<<<< HEAD
      <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
          <TextField
            variant="outlined"
            label="Tìm kiếm"
            value={search}
            onChange={handleSearchChange}
            style={{ width: "50%", minWidth: 200 }}
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
                      '&:hover': {
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
              '& .MuiOutlinedInput-root': {
                paddingRight: 0,
              },
            }}
          />
           <FormControl style={{ width: "20%", minWidth: 250 }} size="small">
            <InputLabel>Môn học</InputLabel>
            <Select
              label="Môn học"
              value={filterSubject}
              onChange={handleSubjectChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="CSDL">Cơ sở dữ liệu</MenuItem>
              <MenuItem value="CSDLNC">Cơ sở dữ liệu nâng cao</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ width: "20%", minWidth: 250 }} size="small">
            <InputLabel>Lớp</InputLabel>
            <Select
              label="Lớp"
              value={filterClass}
              onChange={handleClassChange}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="21CLC05">21CLC05</MenuItem>
              <MenuItem value="22HTTT1">22HTTT1</MenuItem>
            </Select>
          </FormControl>

          <IconButton onClick={handleFilter} disabled={!filterSubject && !filterClass}>
            <FilterAltIcon />
          </IconButton>
        </div>
      </Header>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "15px", fontWeight: "540", color: "#1976D2" }}>
=======
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
>>>>>>> main
          Tổng số lớp hiển thị: {totalStudents}
        </span>
        <AnalyticsTable
          filteredRows={rows}
          columns={columns}
          handleActions={handleViewClass}
        />
      </div>
    </Container>
  );
};

export default ClassesList;
