"use client";
import styled from "styled-components";
import { useRouter } from "next/router";
import StudentResultLNO from "@/components/LearningOutcome/StudentResultLNO";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetail } from "@/redux/thunk/learningoutcomeThunk";
import { FormControl, InputLabel, MenuItem, Select,Tabs,
  Tab, 
  Box} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import DetailExamLNO from "@/components/LearningOutcome/DetailExamLNO";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";


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
  gap: 1rem;
`;

const LineDivider = styled.div`
  background-color: var(--grey-600);
  height: 1px;
  width: 100%;
`;

const DropdownTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  
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
  

  const [tab, setTab] = useState(0);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { classID, studentID } = router.query;
  const { accessToken } = useSelector(state => state.auth);
  const userId = useMemo(() => {
    if (!accessToken) return null;
    try {
      const { sub } = jwtDecode(accessToken);
      console.log(sub);
      return sub;
    } catch {
      return null;
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchStudentRow = async () => {
      await dispatch(
        fetchStudentDetail({
          userId: userId,
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

  const handleTabChange = (e, newIdx) => {
    setTab(newIdx);
  }

  return (
    <Container>
        
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{ marginTop: 2 }}
          >
            <Tab label="TỔNG QUAN" />
            <Tab label="CHI TIẾT" />
          
          </Tabs>
        

       
        
        <Header style={{ alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
            

              <FormControl style={{ width: "20%", minWidth: 250 }} size="small" disabled>
                <InputLabel id="course-label" sx={{ fontSize: "1rem" }}>
                  Môn
                </InputLabel>
                <Select
                  labelId="course-label"
                  value={courseInfo_Student.courseName || ""}
                  label="Môn"
                 
                >
                  <MenuItem value={courseInfo_Student.courseName || ""}>
                    {courseInfo_Student.courseName || "Chưa có dữ liệu"}
                  </MenuItem>
                </Select>
              </FormControl>
            

            
              <FormControl style={{ width: "20%", minWidth: 250 }} size="small" disabled>
                <InputLabel id="class-label" sx={{ fontSize: "1rem" }}>
                  Lớp
                </InputLabel>
                <Select
                  labelId="class-label"
                  value={courseInfo_Student.className || ""}
                  label="Lớp"
                  
                >
                  <MenuItem value={courseInfo_Student.className || ""}>
                    {courseInfo_Student.className || "Chưa có dữ liệu"}
                  </MenuItem>
                </Select>
              </FormControl>
            

            
              <FormControl style={{ width: "20%", minWidth: 250 }} size="small" disabled>
                <InputLabel id="student-label" sx={{ fontSize: "1rem" }}>
                  MSSV - Họ tên
                </InputLabel>
                <Select
                  labelId="student-label"
                  id="student-select"
                  value={studentInfo?.identificationCode || ""}
                  label="MSSV - Họ tên"
                 
                >
                  <MenuItem value={studentInfo?.identificationCode || ""}>
                    {`${studentInfo?.identificationCode || ""} - ${studentInfo?.fullName || ""}`}
                  </MenuItem>
                </Select>
              </FormControl>
            
          </div>
        </Header>

        <div style={{width:"100%"}}>

        
        {
          tab===0 &&(
            <StudentResultLNO
            userId={userId}
            studentID={studentID}
            classID={classID}
            studentInfo={studentInfo_Student}
            studentGrade={grades_Student}
          />

          )
        }

        {
          tab==1 &&(
            <DetailExamLNO userId={userId} studentID={studentID} classID={classID}></DetailExamLNO>
          )

        }
        </div>
      

    </Container>
  );
}
