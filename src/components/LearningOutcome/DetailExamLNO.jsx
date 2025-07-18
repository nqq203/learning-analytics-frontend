
import styled from "styled-components";
import MyGaugeChart from "./GaugeChartLNO";
import TableChart from "./TableChartLNO";
import BarChart from "./BarChartLNO";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,Tooltip } from 'recharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from "chart.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid
  // , Tooltip as LineTooltip, Legend as LineLegend 

} from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';

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

import { Bar } from "react-chartjs-2";

import { PieChart, Pie, Cell,Tooltip as PieToolTip } from 'recharts';
import PieChartIcon from '@mui/icons-material/PieChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const LearningOutcomeBody = styled.div`
  padding-inline:2rem;
  display: flex;
  flex-direction: column;
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
  width: 47%;
  padding: 1rem;
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
 
  
  font-size: 1.2rem;
`;






export default function DetailExamLNO({
//   userId,
//   studentID,
//   classID,
//   studentInfo,
//   studentGrade,
}) {

  const dataAssignment = [
    { subject: 'LO1', Score: 8, fullMark: 10 },
    { subject: 'LO2', Score: 7, fullMark: 10 },
    { subject: 'LO3', Score: 8, fullMark: 10 },
    { subject: 'LO4', Score: 6, fullMark: 10 },
    { subject: 'LO5', Score: 8, fullMark: 10 },
    { subject: 'LO6', Score: 6, fullMark: 10 },
];

const dataFinal = [
  { subject: 'LO1', Score: 8, fullMark: 10 },
  { subject: 'LO2', Score: 9, fullMark: 10 },
  { subject: 'LO3', Score: 2, fullMark: 10 },
  { subject: 'LO4', Score: 9, fullMark: 10 },
  { subject: 'LO5', Score: 4, fullMark: 10 },
  { subject: 'LO6', Score: 6, fullMark: 10 },
];


  const barDataAssignment = {
    labels: dataAssignment.map(item => item.subject),
    datasets: [
      {
        label: 'Assignment',
        data: dataAssignment.map(item => item.Score),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };
  // Bar chart data for Final
  const barDataFinal = {
    labels: dataFinal.map(item => item.subject),
    datasets: [
      {
        label: 'Final',
        data: dataFinal.map(item => item.Score),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const barOptions = (title) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: title },
    },
  });


  const countAssignment = {
    dat: dataAssignment.filter(item => item.Score > 5).length,
    khongdat: dataAssignment.filter(item => item.Score <= 5).length,
  };
  const pieDataAssignment = [
    { name: 'Đạt', value: countAssignment.dat },
    { name: 'Không đạt', value: countAssignment.khongdat },
  ];
  
  const countFinal = {
    dat: dataFinal.filter(item => item.Score > 5).length,
    khongdat: dataFinal.filter(item => item.Score <= 5).length,
  };
  const pieDataFinal = [
    { name: 'Đạt', value: countFinal.dat },
    { name: 'Không đạt', value: countFinal.khongdat },
  ];
  
  const COLORS = ['#00C49F', '#FF8042'];

    

    


  return (
    <LearningOutcomeBody>

      <ChartContainer>
        
        <ChartContainer1>

            
              <ChartBox>

              
                

                  
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
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
                          Điểm theo từng LO của Assignment
                          </Typography>
                          <Typography variant="body2" color="#64748b">
                          Phân bố xếp điểm các LO trong Assignment của sinh viên.
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  
                  
                  

                

            
                <Bar data={barDataAssignment} options={barOptions('Assignment')} />


              </ChartBox>



              <ChartBox>

              <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                    
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                        
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
                      Điểm theo từng LO của các bài Cuối Kỳ
                      </Typography>
                      <Typography variant="body2" color="#64748b">
                      Phân bố xếp điểm các LO trong các bài Cuối Kỳ của sinh viên.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                </Grid>
                
                <Grid item >
                <Box sx={{ mb: 3 }}>
                        <FormControl
                          size="small"
                          sx={{
                            minWidth: 180,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'white',
                              '&:hover fieldset': {
                                borderColor: '#3b82f6',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#1e3a8a',
                              },
                            },
                          }}
                        >
                          <InputLabel>Bài kiểm tra</InputLabel>
                          <Select
                            value="Kiểm tra 1"
                            label="Bài kiểm tra"
                            // onChange={(e) => onFilterChange(filter.key, e.target.value)}
                          >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="">Bài kiểm tra 1</MenuItem>
                            <MenuItem value="">Bài kiểm tra 2</MenuItem>
                            <MenuItem value="">Bài kiểm tra 3</MenuItem>
                          </Select>
                        </FormControl>
                </Box>
                  </Grid>

              </Grid>
                <Bar data={barDataFinal} options={barOptions('Final')} />


              </ChartBox>



        </ChartContainer1>
      </ChartContainer>


      <ChartContainer>
      {/* <TitleChart>Năng lực của sinh viên</TitleChart> */}

        <ChartContainer1>
          
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
                    <EmojiEventsIcon />
                  </Box>

                  <Box>
                    <Typography variant="h6" fontWeight="700" color="#1e293b">
                      Năng lực theo từng LO của Assignment
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                    Tổng hợp năng lực theo các LO trong Assignment của sinh viên.
                    </Typography>
                  </Box>
                </Box>
          </Box>
           

            <ResponsiveContainer width="100%" height={300}>
              
              <RadarChart data={dataAssignment}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Điểm" dataKey="Score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Tooltip />
              </RadarChart>
            
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox>
            {/* <TitleChart>Cuối kỳ: </TitleChart> */}
            <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
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
                      <EmojiEventsIcon />
                    </Box>

                    <Box>
                      <Typography variant="h6" fontWeight="700" color="#1e293b">
                        Năng lực theo từng LO của các bài Cuối Kỳ
                      </Typography>
                      <Typography variant="body2" color="#64748b">
                      Tổng hợp năng lực theo các LO trong các bài Cuối Kỳ của sinh viên.
                      </Typography>
                    </Box>
                  </Box>
              </Box>
              </Grid>

              <Grid item >
              <Box sx={{ mb: 3 }}>
                        <FormControl
                          size="small"
                          sx={{
                            minWidth: 180,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'white',
                              '&:hover fieldset': {
                                borderColor: '#3b82f6',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#1e3a8a',
                              },
                            },
                          }}
                        >
                          <InputLabel>Bài kiểm tra</InputLabel>
                          <Select
                            value="Kiểm tra 1"
                            label="Bài kiểm tra"
                            // onChange={(e) => onFilterChange(filter.key, e.target.value)}
                          >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="">Bài kiểm tra 1</MenuItem>
                            <MenuItem value="">Bài kiểm tra 2</MenuItem>
                            <MenuItem value="">Bài kiểm tra 3</MenuItem>
                          </Select>
                    </FormControl>
                    </Box>
              </Grid>

            </Grid>
            <ResponsiveContainer width="100%" height={300}>
              
              <RadarChart data={dataFinal}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Điểm" dataKey="Score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Tooltip />
              </RadarChart>
            
            </ResponsiveContainer>


          </ChartBox>
          
        </ChartContainer1>
      </ChartContainer>



      <ChartContainer>
      


        <ChartContainer1>
          
          <ChartBox>
          <Box sx={{ mb: 3 }}>
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
                    <PieChartIcon />
                  </Box>

                  <Box>
                    <Typography variant="h6" fontWeight="700" color="#1e293b">
                      Tỉ lệ đạt của các LO của theo các bài Assignment
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                    Tỉ lệ đạt chuẩn đầu ra của các LO theo các bài Assignment sinh viên.
                    </Typography>
                  </Box>
                </Box>
          </Box>
             <ResponsiveContainer width="100%" height={350}>
                <PieChart >
                  <Pie
                    data={pieDataAssignment}
                    // cx="50%"
                    // cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    // outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataAssignment.map((entry, index) => (
                      <Cell key={`cell-assignment-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  {/* <PieToolTip></PieToolTip> */}
                </PieChart>
              </ResponsiveContainer>
          </ChartBox>

          <ChartBox>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box sx={{ mb: 3 }}>
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
                        <PieChartIcon />
                      </Box>

                      <Box>
                        <Typography variant="h6" fontWeight="700" color="#1e293b">
                          Tỉ lệ đạt của các LO của theo các bài Cuối Kỳ
                        </Typography>
                        <Typography variant="body2" color="#64748b">
                        Tỉ lệ đạt chuẩn đầu ra của các LO theo các bài Cuối Kỳ sinh viên.
                        </Typography>
                      </Box>
                    </Box>
              </Box>
          </Grid>
          
          <Grid item >
          <Box sx={{ mb: 3 }}>
                    <FormControl
                          size="small"
                          sx={{
                            minWidth: 180,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'white',
                              '&:hover fieldset': {
                                borderColor: '#3b82f6',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#1e3a8a',
                              },
                            },
                          }}
                        >
                          <InputLabel>Bài kiểm tra</InputLabel>
                          <Select
                            value="Kiểm tra 1"
                            label="Bài kiểm tra"
                            // onChange={(e) => onFilterChange(filter.key, e.target.value)}
                          >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="">Bài kiểm tra 1</MenuItem>
                            <MenuItem value="">Bài kiểm tra 2</MenuItem>
                            <MenuItem value="">Bài kiểm tra 3</MenuItem>
                          </Select>
                    </FormControl>
          </Box>
          </Grid>

          </Grid>


             <ResponsiveContainer width="100%" height={350}>
                <PieChart >
                  <Pie
                    data={pieDataFinal}
                    // cx="50%"
                    // cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    // outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataFinal.map((entry, index) => (
                      <Cell key={`cell-assignment-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  {/* <PieToolTip></PieToolTip> */}
                </PieChart>
              </ResponsiveContainer>
          
          
          </ChartBox>
          
        </ChartContainer1>
      </ChartContainer>
      

      <ChartContainer>
      {/* <TitleChart>Năng lực của sinh viên</TitleChart> */}

        <ChartContainer1>
          
          <ChartBox>
          <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                  
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
                    <ShowChartIcon />
                  </Box>

                  <Box>
                    <Typography variant="h6" fontWeight="700" color="#1e293b">
                      Diễn biến điểm của LO của theo các bài Assignment
                    </Typography>
                    <Typography variant="body2" color="#64748b">
                    Tổng hợp diễn biến điểm của các LO theo các bài Assignment sinh viên.
                    </Typography>
                  </Box>
                </Box>
          </Box>


             <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={dataAssignment}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Score" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
              </ResponsiveContainer>
          </ChartBox>

          <ChartBox>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                      
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
                        <ShowChartIcon />
                      </Box>

                      <Box>
                        <Typography variant="h6" fontWeight="700" color="#1e293b">
                          Diễn biến điểm của LO của theo các bài Cuối Kỳ
                        </Typography>
                        <Typography variant="body2" color="#64748b">
                        Tổng hợp diễn biến điểm của các LO theo các bài Cuối Kỳ sinh viên.
                        </Typography>
                      </Box>
                    </Box>
              </Box>
            </Grid>
            
            <Grid item >
            <Box sx={{ mb: 3 }}>
                        <FormControl
                          size="small"
                          sx={{
                            minWidth: 180,
                            '& .MuiOutlinedInput-root': {
                              bgcolor: 'white',
                              '&:hover fieldset': {
                                borderColor: '#3b82f6',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#1e3a8a',
                              },
                            },
                          }}
                        >
                          <InputLabel>Bài kiểm tra</InputLabel>
                          <Select
                            value="Kiểm tra 1"
                            label="Bài kiểm tra"
                            // onChange={(e) => onFilterChange(filter.key, e.target.value)}
                          >
                            <MenuItem value="">Tất cả</MenuItem>
                            <MenuItem value="">Bài kiểm tra 1</MenuItem>
                            <MenuItem value="">Bài kiểm tra 2</MenuItem>
                            <MenuItem value="">Bài kiểm tra 3</MenuItem>
                          </Select>
                    </FormControl>
            </Box>
            </Grid>

          </Grid>

             <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={dataFinal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Score" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
              </ResponsiveContainer>
          </ChartBox>
          
        </ChartContainer1>
      </ChartContainer>


    </LearningOutcomeBody>
  );
}
