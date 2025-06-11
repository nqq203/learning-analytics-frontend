import styled from "styled-components";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";


import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  IconButton,
  Select,
  Box,
  CircularProgress
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClassListLNO from "@/components/LearningOutcome/ClassListLNO";
import {
  FetchAcademicYearClass,
  fetchFilteredClasses,
} from "@/redux/thunk/learningoutcomeThunk";
import { jwtDecode } from "jwt-decode";


const ClassTableHeader = ["STT", "Lớp", "Khóa", "Môn", "Học Kỳ", "Tín chỉ", "Chi tiết"];
const semester = [1, 2, 3];

const LearningOutcome = () => {
  const { classes, totalRecords,academicYear, loading } = useSelector((state) => state.learningoutcome);
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

  const handleScrollEnd = () => {
    if (!isLoading && classes.length >= amount) {
      setPage((prev) => prev + 1);
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
    if (classID !== "") {
      router.push(`/analytics/learning-outcome/student-list/${classID}`);
    }
  }, [classID]);

  return (
    <Container>
      
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
            
              <TextField
                variant="outlined"
                label="Tìm kiếm"
                style={{ width: "55%", minWidth: 200 }}
                size="small"
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                InputProps={{
                  
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          backgroundColor: "#1976D2",
                          borderRadius: "0 4px 4px 0",
                          padding: "10px",
                          height: "100%",
                          '&:hover': {
                            backgroundColor: "#1976d2",
                        },
                      }}
                        onClick={() => handleSearchResult(searchKeyword)}
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
           
            <FormControl style={{ width: "22.5%", minWidth: 250 }} size="small">
              <InputLabel id="academic-year-label">Khóa</InputLabel>
              <Select
                labelId="academic-year-label"
                label="Chọn khóa"
                onChange={(e) => handleChangeAcademicYear(e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {academicYear.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl style={{ width: "22.5%", minWidth: 250 }} size="small">
              <InputLabel id="semester-label">Kỳ</InputLabel>
              <Select
                labelId="semester-label"
                label="Chọn kỳ"
                onChange={(e) => handleChangeSemester(e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {semester.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

        </div>
          
        </Header>

       
        
       <div style={{ display: "flex", flexDirection: "column" }}>

        <span style={{ paddingLeft: "20px", paddingTop: "20px", fontSize: "20px", fontWeight: "700" }}>
          Tổng số lớp hiển thị: {totalRecords}
        </span>

        <Box position="relative">
          <ClassListLNO
            TableHeader={ClassTableHeader}
            TableContent={rows}
            setClassID={setClassID}
            onScrollEnd={handleScrollEnd}
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

export default LearningOutcome;
