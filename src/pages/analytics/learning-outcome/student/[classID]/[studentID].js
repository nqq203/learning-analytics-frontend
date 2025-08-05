"use client";
import styled from "styled-components";
import { useRouter } from "next/router";
import StudentResultLNO from "@/components/LearningOutcome/StudentResultLNO";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetail } from "@/redux/thunk/learningoutcomeThunk";
import {
  FormControl, InputLabel, MenuItem, Select, Tabs,
  Tab,
  Box
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import DetailExamLNO from "@/components/LearningOutcome/DetailExamLNO";
import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";
import BreadcrumbComponent from "@/components/Breadcrumb";


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
  const dispatch = useDispatch();
  const { courseInfo, grades, studentInfo } = useSelector(
    (state) => state.learningoutcome
  );
  const [tab, setTab] = useState(0);
  const router = useRouter();
  const { classID, studentID } = router.query;
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
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    const getBreadcrumbs = () => {
      const baseBreadcrumbs = [
        {
          type: 'home',
          label: 'Trang chủ',
          path: '/'
        },
        {
          type: 'analytics',
          label: 'Kết quả học tập',
          path: `/analytics/learning-outcome`
        }
      ];

      if (classID && studentID) {
        if (studentInfo && courseInfo) {
          const classParams = new URLSearchParams({
            className: courseInfo?.className || '',
            courseName: courseInfo?.courseName || '',
          })

          baseBreadcrumbs.push({
            type: 'students',
            label: `${courseInfo?.className} - ${courseInfo?.courseName}`,
            path: `/analytics/learning-outcome/student-list/${classID}?${classParams.toString()}`
          });
        }

        baseBreadcrumbs.push({
          type: 'charts',
          label: `Kết quả học tập của ${studentInfo?.fullName} - ${studentInfo?.identificationCode}`,
        });
      }

      return baseBreadcrumbs;
    }

    setBreadcrumbs(getBreadcrumbs());
  }, [classID, studentID, studentInfo, courseInfo]);

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
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: "10px",
          justifyContent: "space-between",
          width: '100%',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          width="40%"
        >
          <Tab label="TỔNG QUAN" />
          <Tab label="CHI TIẾT" />
        </Tabs>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "70%", justifyContent: "flex-end" }}>
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

      {/* Breadcrumbs Navigation */}
      <BreadcrumbComponent
        breadcrumbs={breadcrumbs}
        variant="default"
      />

      <div style={{ width: "100%" }}>
        {
          tab === 0 && (
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
          tab == 1 && (
            <DetailExamLNO userId={userId} studentID={studentID} classID={classID}></DetailExamLNO>
          )
        }
      </div>
    </Container>
  );
}
