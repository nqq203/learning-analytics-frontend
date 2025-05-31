"use client";
import styled from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentListLNO from "@/components/LearningOutcome/StudentListLNO";
import { useRouter } from "next/router";
import { TextField, FormControl, InputAdornment, IconButton, Box, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { fetchStudentSearch } from "@/redux/thunk/learningoutcomeThunk";
import { jwtDecode } from "jwt-decode";

const LearningOutcomesContainer = styled.div`
  margin: auto;
  width: 97%;
  padding-block: 20px;
`;

const LearningOutComeContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LearningOutComeHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
`;

const LearningOutComeItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const LineDivider = styled.div`
  border: 0.1px solid gray;
  width: 100%;
`;

const TableHeader = ["MSSV", "Họ tên", "Lớp", "Môn", "Khóa", "Chuyên ngành", "Kết Quả", "Chi tiết"];

const StudentContainerLNO = () => {
  const { studentsOverview, totalRecords, loading } = useSelector(state => state.learningoutcome);
  const dispatch = useDispatch();
  const router = useRouter();
  const { classID } = router.query;
  const [studentID, setStudentID] = useState("");
  const [amount, setAmount] = useState(10);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const { accessToken } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(()=>{
  //   console.log("Rows: ",rows)
  // },[rows])
  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);

  const handleSearch = (value) => {
    setSearchKeyword(value);
  };

  const handleSearchResult = (value) => {
    setSearchResult(value);
    setPage(1); // reset page
    setRows([]); // reset data
  };

  const fetchStudentRow = async () => {
    // setIsLoading(true);
    await dispatch(fetchStudentSearch({ userId: userId, classId: classID, page: page, amount: amount, search: searchResult }));
    // setIsLoading(false);
  };

  const handleScrollEnd = () => {
    if (!isLoading && rows.length < totalRecords) {
      setPage(prev => prev + 1);
    }
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
    <LearningOutcomesContainer>
      <LearningOutComeContainerBody>
        <LearningOutComeHeader>
          <LearningOutComeItemsContainer style={{ width: "100%" }}>
            <FormControl style={{ width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                variant="outlined"
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                InputProps={{
                  style: {
                    height: 40,
                    paddingRight: 0,
                    fontSize: "0.9rem",
                    alignItems: "center",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          backgroundColor: "#1976D2",
                          borderRadius: "0 4px 4px 0",
                          padding: "10px",
                          height: "40px",
                          '&:hover': {
                            backgroundColor: "#1565C0",
                          },
                        }}
                        onClick={() => handleSearchResult(searchKeyword)}
                      >
                        <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: {
                    lineHeight: "40px",
                    top: "-15px",
                  },
                }}
              />
            </FormControl>
          </LearningOutComeItemsContainer>

          {/* <LearningOutComeItemsContainer style={{ width: "6%" }}> */}
          {/* Nút lọc hoặc hành động khác nếu cần */}
          {/* </LearningOutComeItemsContainer> */}
        </LearningOutComeHeader>

        <LineDivider />

        <Box position="relative">
          <StudentListLNO
            TableContent={rows}
            TableHeader={TableHeader}
            setStudentID={setStudentID}
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
              <CircularProgress size="50px"/>
            </Box>
          )}
        </Box>
      </LearningOutComeContainerBody>
    </LearningOutcomesContainer>
  );
};

export default StudentContainerLNO;
