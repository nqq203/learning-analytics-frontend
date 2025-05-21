import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import StudentList from "@/components/PredictionAchievements/StudentList";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentSearch } from "@/redux/thunk/learningoutcomeThunk";
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

const TableHeader = ["MSSV", "Họ tên", "Lớp", "Môn", "Khóa", "Chi tiết"];
const ClassStudentContainer = () => {
  const userId = "12456";
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
          userId: "I1132",
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
      alert("Chọn ít nhất một sinh viên");
    } else {
      const encodedData = encodeURIComponent(JSON.stringify(chosenStudent));
      router.push(
        `/predictions/predict-achievements/improvement-suggestion?data=${encodedData}`
      );
    }
  };

  const handleChangeAcedemicYear = (value) => {};

  return (
    <LearningOutcomesContainer>
      <LearningOutComeContainerBody>
        <LearningOutComeHeader>
          <LearningOutComeItemsContainer>
            <FormControl style={{ minWidth: "40rem" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Tìm kiếm"
                variant="outlined"
              />
            </FormControl>

            <FormControl style={{ minWidth: "12rem" }} variant="outlined">
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
          </LearningOutComeItemsContainer>

          <LearningOutComeItemsContainer>
            <AnalyticsBtn>Lọc</AnalyticsBtn>
            <AnalyticsBtn onClick={() => handleNav()}>Dự đoán</AnalyticsBtn>
          </LearningOutComeItemsContainer>
        </LearningOutComeHeader>

        <LineDivider></LineDivider>

        <StudentList
          TableHeader={TableHeader}
          TableContent={studentList}
          setChosenStudentOuter={setChosenStudent}
        >
          {" "}
        </StudentList>
      </LearningOutComeContainerBody>
    </LearningOutcomesContainer>
  );
};

export default ClassStudentContainer;
