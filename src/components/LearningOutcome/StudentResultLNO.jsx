"use client";

import styled from "styled-components";
import MyGaugeChart from "./GaugeChartLNO";
import TableChart from "./TableChartLNO";
import BarChart from "./BarChartLNO";
import TableChartIcon from '@mui/icons-material/TableChart';
import SpeedIcon from '@mui/icons-material/Speed';

import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
const LearningOutcomeBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline:1rem;
  align-items:center;
  justify-content:center;
  
  gap: 1rem;
  margin-top:1rem;
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
  padding: 1.1rem;
  text-align: center;
  border-radius: 10px;
`;

const BarChartContainer1 = styled.div`
  margin: auto;
`;

const BarChartBox = styled.div`
  padding:1rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.25);
  background-color: white;
  width: 100%;
  
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const TitleChart = styled.div`
  text-align: left;
 
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

      <ChartContainer>
        <ChartContainer1>
          {/* Biểu đồ cột đưa lên trên */}
          <ChartBox>
          <Box sx={{ mb: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: "linear-gradient(135deg,rgba(51, 232, 34, 0.91) 0%,rgb(58, 237, 73) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <EqualizerIcon />
                        </Box>

                        <Box>
                          <Typography variant="h6" fontWeight="700" color="#1e293b">
                          Thống kê điểm
                          </Typography>
                          <Typography variant="body2" color="#64748b">
                          Phân bố điểm của các cột điểm của sinh viên. Bao gồm các cột điểm như: đồ án, thực hành, giữa kỳ, cuối kỳ, tổng kết.
                          </Typography>
                        </Box>
                      </Box>
          </Box>
            
            <BarChart studentGrade={studentGrade} />
          </ChartBox>

          <ChartBox>
          <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <TableChartIcon />
                        </Box>

                        <Box>
                          <Typography variant="h6" fontWeight="700" color="#1e293b">
                          Điểm của sinh viên
                          </Typography>
                          <Typography variant="body2" color="#64748b">
                          Bảng điểm chi tiết của một sinh viên. Bao gồm: đồ án, thực hành, giữa kỳ, cuối kỳ, tổng kết.
                          </Typography>
                        </Box>
                      </Box>
          </Box>
            <TableChart studentGrade={studentGrade} />
          </ChartBox>
        </ChartContainer1>
      </ChartContainer>

      {/* Biểu đồ Gauge đưa xuống dưới */}
      <ChartContainer>

        
        <ChartContainer1>
          <ChartBox>
            <Box sx={{ mb: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                          
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              background: "linear-gradient(135deg,rgb(222, 230, 70) 0%,rgb(222, 245, 50) 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "white",
                            }}
                          >
                            <SpeedIcon />
                          </Box>

                          <Box>
                            <Typography variant="h6" fontWeight="700" color="#1e293b">
                            Loại sinh viên: {studentGrade.classification}
                            </Typography>
                            <Typography variant="body2" color="#64748b">
                            Phân loại đánh giá của một sinh viên. Bao gồm: kém, yếu, trung bình, khá, giỏi, xuất sắc.
                            </Typography>
                          </Box>
                        </Box>
            </Box>
            <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
              <MyGaugeChart value={studentGrade.totalGrade} />
            </div>
          </ChartBox>
        </ChartContainer1>
      </ChartContainer>
    </LearningOutcomeBody>
  );
}
