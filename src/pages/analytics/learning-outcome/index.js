import styled from "styled-components";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ClassListLNO from "@/components/LearningOutcome/ClassListLNO";
import {
  FetchAcademicYearClass,
  fetchFilteredClasses,
} from "@/redux/thunk/learningoutcomeThunk";
import { jwtDecode } from "jwt-decode";

// Styled Components
const LearningOutcomesContainer = styled.div`
  margin: auto;
  width: 97%;
  padding-top: 1.5rem;
`;

const LearningOutComeContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const LearningOutComeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  align-items: center;
`;

const LearningOutComeItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const LearningOutComeTabButtons = styled.div`
  display: flex;
  padding: 0.7rem 2rem;
  font-weight: bold;
  color: var(--blue-800);
  border: 1px solid var(--blue-800);
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;

  &:hover {
    color: var(--blue-300);
    border-color: var(--blue-300);
  }

  &:active {
    color: var(--blue-800);
    border-color: var(--blue-800);
  }
`;

const LineDivider = styled.div`
  background-color: var(--grey-600);
  height: 1px;
  width: 100%;
`;

const NextBtn = styled.div`
  padding-inline: 1.5rem;
  height: 40px;
  display: flex;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background-color: var(--blue-700);
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: var(--blue-900);
  }
`;

const ClassTableHeader = ["STT", "Lớp", "Khóa", "Môn", "Học Kỳ", "Tín chỉ", "Chi tiết"];
const semester = [1, 2, 3];

const LearningOutcome = () => {
  const { classes, academicYear } = useSelector((state) => state.learningoutcome);
  const dispatch = useDispatch();
  const router = useRouter();

  const [classID, setClassID] = useState("");
  const [page, setPage] = useState(1);
  const [amount] = useState(10);
  const [chosenAcademicYear, setChosenAcademicYear] = useState("");
  const [chosenSemester, setChosenSemester] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    await dispatch(
      fetchFilteredClasses({
        userId: userId,
        page,
        amount,
        semester: chosenSemester,
        academicYear: chosenAcademicYear,
      })
    );
    setIsLoading(false);
  };

  const handleScrollEnd = () => {
    if (!isLoading && classes.length >= amount) {
      setPage((prev) => prev + 1);
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
  }, [chosenAcademicYear, chosenSemester, page]);

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
    <LearningOutcomesContainer>
      <LearningOutComeContainerBody>
        <LearningOutComeHeader>
          <LearningOutComeItemsContainer>
            <LearningOutComeTabButtons>DANH SÁCH LỚP</LearningOutComeTabButtons>
          </LearningOutComeItemsContainer>

          <LearningOutComeItemsContainer>
            <FormControl sx={{ minWidth: 200 }} variant="outlined" size="small">
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

            <FormControl sx={{ minWidth: 200 }} variant="outlined" size="small">
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

            <NextBtn>Tiếp tục</NextBtn>
          </LearningOutComeItemsContainer>
        </LearningOutComeHeader>

        <LineDivider />

        <ClassListLNO
          TableHeader={ClassTableHeader}
          TableContent={rows}
          setClassID={setClassID}
          onScrollEnd={handleScrollEnd}
        />
      </LearningOutComeContainerBody>
    </LearningOutcomesContainer>
  );
};

export default LearningOutcome;
