"use client";
import styled from "styled-components";
import { useRouter } from "next/router";
import StudentResultLNO from "@/components/LearningOutcome/StudentResultLNO";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetail } from "@/redux/thunk/learningoutcomeThunk";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
  padding-bottom: 10px;
  align-items: center;
`;

const LearningOutComeItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const LineDivider = styled.div`
  background-color: var(--grey-600);
  height: 1px;
  width: 100%;
`;

const DropdownTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
`;

const DropdownTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
`;

export default function StudentAnalytics() {
  const { courseInfo, grades, studentInfo } = useSelector(
    (state) => state.learningoutcome
  );
  const dispatch = useDispatch();
  const [userID] = useState("123");
  const router = useRouter();
  const { classID, studentID } = router.query;

  useEffect(() => {
    const fetchStudentRow = async () => {
      await dispatch(
        fetchStudentDetail({
          userId: "I1132",
          classId: classID,
          studentId: studentID,
        })
      );
    };
    fetchStudentRow();
  }, [router.query, classID, studentID]);

  const courseInfo_Student = useMemo(() => {
    return courseInfo || {};
  }, [courseInfo]);

  const grades_Student = useMemo(() => {
    return grades || [];
  }, [grades]);

  const studentInfo_Student = useMemo(() => {
    return studentInfo || [];
  }, [studentInfo]);

  return (
    <LearningOutcomesContainer key={studentID}>
      <LearningOutComeContainerBody>
        <LearningOutComeHeader>
          <LearningOutComeItemsContainer>
            <DropdownTitleContainer>
              <FormControl sx={{ minWidth: 300, height: 40 }}>
                <InputLabel id="course-label" sx={{ fontSize: "1rem" }}>
                  Môn
                </InputLabel>
                <Select
                  labelId="course-label"
                  value={courseInfo_Student.courseName || ""}
                  label="Môn"
                  sx={{
                    height: 40,
                    fontSize: "1rem",
                  }}
                >
                  <MenuItem value={courseInfo_Student.courseName || ""}>
                    {courseInfo_Student.courseName || "Chưa có dữ liệu"}
                  </MenuItem>
                </Select>
              </FormControl>
            </DropdownTitleContainer>

            <DropdownTitleContainer>
              <FormControl sx={{ minWidth: 300, height: 40 }}>
                <InputLabel id="class-label" sx={{ fontSize: "1rem" }}>
                  Lớp
                </InputLabel>
                <Select
                  labelId="class-label"
                  value={courseInfo_Student.className || ""}
                  label="Lớp"
                  sx={{
                    height: 40,
                    fontSize: "1rem",
                  }}
                >
                  <MenuItem value={courseInfo_Student.className || ""}>
                    {courseInfo_Student.className || "Chưa có dữ liệu"}
                  </MenuItem>
                </Select>
              </FormControl>
            </DropdownTitleContainer>

            <DropdownTitleContainer>
              <FormControl sx={{ minWidth: 300, height: 40 }} disabled>
                <InputLabel id="student-label" sx={{ fontSize: "1rem" }}>
                  MSSV - Họ tên
                </InputLabel>
                <Select
                  labelId="student-label"
                  id="student-select"
                  value={studentInfo?.studentId || ""}
                  label="MSSV - Họ tên"
                  sx={{
                    height: 40,
                    fontSize: "1rem",
                  }}
                >
                  <MenuItem value={studentInfo?.studentId || ""}>
                    {`${studentInfo?.studentId || ""} - ${studentInfo?.fullName || ""}`}
                  </MenuItem>
                </Select>
              </FormControl>
            </DropdownTitleContainer>
          </LearningOutComeItemsContainer>
        </LearningOutComeHeader>

        <LineDivider />

        <StudentResultLNO
          userId={userID}
          studentID={studentID}
          classID={classID}
          studentInfo={studentInfo_Student}
          studentGrade={grades_Student}
        />
      </LearningOutComeContainerBody>
    </LearningOutcomesContainer>
  );
}
