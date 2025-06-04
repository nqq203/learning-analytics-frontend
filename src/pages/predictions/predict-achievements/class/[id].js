import styled from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";

import StudentList from "@/components/PredictionAchievements/StudentList";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSearch } from "@/redux/thunk/learningoutcomeThunk";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
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
  justify-content: space-between;

  align-items: center;
`;

const LearningOutComeItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const AnalyticsBtn = styled.div`
  cursor: pointer;
  padding-inline: 2rem;
  padding-block: 1rem;
  color: white;
  font-size: 1.2rem;
  background-color: var(--blue-600);
  border: none;
  border-radius: 10px;
  font-weight: bold;

  &:hover {
    background-color: var(--blue-400);
  }
  &:active {
    background-color: var(--blue-500);

  }
`;

const LineDivider = styled.div`
  border: 0.1px solid gray;
  width: 100%;
`;


const TableHeader = ["MSSV", "Họ và tên", "Lớp", "Môn", "Khóa"];
const ClassStudentContainer = () => {
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
  const dispatch = useDispatch();

  const { studentsOverview, totalRecords, academicYear } = useSelector(
    (state) => state.learningoutcome
  );
  // const [studentID,setStudentID] = useState("");
  const [chosenStudent, setChosenStudent] = useState([]);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(10);
  const [searchResult, setSearchResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const { id } = router.query;

  useEffect(() => {
    const fetchStudentRow = async () => {
      if (!id) return;

      setIsLoading(true);
      const response = await dispatch(
        fetchStudentSearch({
          userId: userId,
          classId: id,
          page: page,
          amount: amount,
          search: searchResult,
        })
      );
      setStudentList(
        (response?.payload?.data?.studentsList || []).map((item) => {
          return {
            ID: item.studentId,
            MSSV: item.studentId,
            Name: item.fullName,
            Class: item.className,
            Subject: item.courseName,
            ClassOf: item.academicYear,
          };
        })
      );
      setIsLoading(false);
    };
    fetchStudentRow();
  }, [searchResult, page, id, dispatch]);

  const handleNav = () => {
    if (chosenStudent.length === 0) {
      toast.warning("Chọn ít nhất một sinh viên");
    } else {
      const encodedData = encodeURIComponent(JSON.stringify(chosenStudent));
      router.push(
        `/predictions/predict-achievements/improvement-suggestion?data=${encodedData}`
      );
    }
  };

  const handleChangeAcedemicYear = (value) => { };

  return (
    <Container>
      
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between", width: "100%" }}>

            
              <TextField
                variant="outlined"
                label="Tìm kiếm"
                style={{ width: "55%", minWidth: 200 }}
                size="small"
                onChange={(e) => handleSearch(e.target.value)}
               
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
              <InputLabel>Khóa</InputLabel>
              <Select
                label="Chọn khóa"
                onChange={(e) => handleChangeAcedemicYear(e.target.value)}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {academicYear.map((item, index) => {
                  return (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          

          
            <ActionButton
            variant="contained"
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}>Lọc</ActionButton>

            <ActionButton 
            onClick={() => handleNav()}
            variant="contained"
            style={{ width: "10%", fontWeight: "700", fontSize: "14px" }}>Dự đoán</ActionButton>
          
            </div>
          
        </Header>

        

        <StudentList
          TableHeader={TableHeader}
          TableContent={studentList}
          setChosenStudentOuter={setChosenStudent}
        >
          {" "}
        </StudentList>
      
    </Container>
  );
};

export default ClassStudentContainer;
