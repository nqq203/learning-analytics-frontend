"use client";

import styled from "styled-components";
import MyGaugeChart from "./GaugeChartLNO";
import TableChart from "./TableChartLNO";
import BarChart from "./BarChartLNO";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const LearningOutcomeBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ChartContainer1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const ChartBox = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  background-color: white;
  width: 50%;
  // height: 300px;
  padding: 1rem;
  text-align: center;
  border-radius: 10px;
`;

const BarChartContainer1 = styled.div`
  margin: auto;
`;

const BarChartBox = styled.div`
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  background-color: white;
  width: 100%;
  padding: 1rem;
  padding-inline: 2rem;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const TitleChart = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

export default function StudentResultLNO({
  userId,
  studentID,
  classID,
  studentInfo,
  studentGrade,
}) {
  const studentScore = 6.5;

  return (
    <LearningOutcomeBody>
      {/* <DropdownTitleContainer>
        <DropdownTitle>MSSV - Họ tên:</DropdownTitle>

        <FormControl sx={{ minWidth: 300 }} disabled>
          <InputLabel id="student-label">MSSV - Họ tên</InputLabel>
          <Select
            labelId="student-label"
            id="student-select"
            value={studentInfo?.studentId || ""}
            label="MSSV - Họ tên"
          >
            <MenuItem value={studentInfo?.studentId || ""}>
              {`${studentInfo?.studentId || ""} - ${studentInfo?.fullName || ""}`}
            </MenuItem>
          </Select>
        </FormControl>
      </DropdownTitleContainer> */}

      <ChartContainer>
        <ChartContainer1>
          {/* Biểu đồ cột đưa lên trên */}
          <ChartBox>
            <TitleChart>Thống kê điểm</TitleChart>
            <BarChart studentGrade={studentGrade} />
          </ChartBox>

          <ChartBox>
            <TitleChart>Điểm của sinh viên</TitleChart>
            <TableChart studentGrade={studentGrade} />
          </ChartBox>
        </ChartContainer1>
      </ChartContainer>

      {/* Biểu đồ Gauge đưa xuống dưới */}
      <BarChartContainer1>
        <BarChartBox>
          <h2 style={{ textAlign: "left", marginBottom: "1rem" }}>
            Loại xếp hạng của sinh viên:
            <span style={{ fontWeight: 500 }}>
              {" "}
              {studentGrade.classification}
            </span>
          </h2>
          <MyGaugeChart value={studentGrade.totalGrade} />
        </BarChartBox>
      </BarChartContainer1>
    </LearningOutcomeBody>
  );
}
