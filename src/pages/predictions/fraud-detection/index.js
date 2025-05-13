import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentListLNO from "@/components/LearningOutcome/StudentListLNO";
import { useRouter } from "next/router";
import { TextField, FormControl, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon từ Material UI
import { fetchStudent, fetchStudentSearch } from "@/redux/thunk/learningoutcomeThunk";

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

const TableHeader = ["MSSV", "Họ tên", "Lớp", "Môn", "Khóa", "Chuyên ngành", "Kết Quả", "Hành Động"];

const StudentContainerLNO = () => {
    const { studentsOverview, totalRecords } = useSelector(state => state.learningoutcome);
    const dispatch = useDispatch();
    const router = useRouter();
    const { classID } = router.query;
    const [studentID, setStudentID] = useState("");

    const [amount, setAmount] = useState(10);
    const [page, setPage] = useState(1);

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [rows, setRows] = useState([]);

    const handleSearch = (value) => { setSearchKeyword(value); }

    const handleSearchResult = (value) => {
        setSearchResult(value);
        setPage(1); // reset page
        setRows([]); // reset data
    }

    const fetchStudentRow = async () => {
        setIsLoading(true);
        await dispatch(fetchStudentSearch({
            userId: "I1132",
            classId: classID,
            page: page,
            amount: amount,
            search: searchResult
        }));
        setIsLoading(false);
    }

    const handleScrollEnd = () => {
        if (!isLoading && rows.length < totalRecords) {
            setPage(prev => prev + 1);
        }
    };

    useEffect(() => {
        fetchStudentRow();
    }, [router, searchResult, page]);

    useEffect(() => {
        if (page === 1) {
            setRows(studentsOverview)
        } else {
            setRows(prev => [...prev, ...studentsOverview])
        }
    }, [studentsOverview]);

    useEffect(() => {
        console.log(`Chuyển sang Students ${studentID}`);
        if (studentID != "") {
            router.push(`/analytics/learning-outcome/student/${classID}/${studentID}`);
        }
    }, [studentID]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchResult(searchKeyword); // Khi nhấn Enter, thực hiện tìm kiếm
        }
    };

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
                                onKeyDown={handleKeyPress} // Xử lý sự kiện khi nhấn Enter
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                sx={{
                                                    backgroundColor: "#1976D2", // Màu nền xanh
                                                    borderRadius: "0 4px 4px 0", // Bo tròn góc phải
                                                    padding: "10px",
                                                    height: "100%",
                                                    '&:hover': {
                                                        backgroundColor: "#1565C0", // Màu nền xanh khi hover
                                                    },
                                                }}
                                                onClick={() => handleSearchResult(searchKeyword)} // Thực hiện tìm kiếm khi nhấn icon
                                            >
                                                <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                    </LearningOutComeItemsContainer>
                    <LearningOutComeItemsContainer style={{ width: "6%" }}>
                        {/* <AnalyticsBtn onClick={() => handleSearchResult(searchKeyword)}>Lọc</AnalyticsBtn> */}
                    </LearningOutComeItemsContainer>
                </LearningOutComeHeader>

                <LineDivider></LineDivider>

                <StudentListLNO TableContent={rows} TableHeader={TableHeader} setStudentID={setStudentID} onScrollEnd={handleScrollEnd}></StudentListLNO>

            </LearningOutComeContainerBody>
        </LearningOutcomesContainer>
    );
};

export default StudentContainerLNO;
