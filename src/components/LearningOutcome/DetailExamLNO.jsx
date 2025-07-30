
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
import { fetchAllExam } from "@/redux/thunk/dataThunk";
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
import { FetchLOChart,FetchLOFinal } from "@/redux/thunk/learningoutcomeThunk";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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



export default function DetailExamLNO({
//   userId,
  studentID,
  classID,
  userId
//   studentInfo,
//   studentGrade,
}) {

  
  const { finalExams } = useSelector(state => state.data);

  const [chosenBarFinal, setChosenBarFinal] = useState();
  const [chosenRadarFinal, setChosenRadarFinal] = useState();
  const [chosenPieFinal, setChosenPieFinal] = useState();
  const [chosenLineFinal, setChosenLineFinal] = useState();
  
  


 
  
  const { LoChart, assignmentQuiz,finalExamDataBar,finalExamDataRadar,finalExamDataLine,finalExamDataPie,finalExamData } = useSelector(
    (state) => state.learningoutcome
  );

  useEffect(()=>{

      if (Array.isArray(finalExams) && finalExams.length > 0) {
        setChosenBarFinal(finalExams[0]?.finalExamId);
        setChosenRadarFinal(finalExams[0]?.finalExamId);
        setChosenPieFinal(finalExams[0]?.finalExamId);
        setChosenLineFinal(finalExams[0]?.finalExamId);

      }

  },[finalExams])


  // Bar Chart
  useEffect(()=>{

    if(chosenBarFinal)
    {
      const fetchBarData = async ()=>{
        await dispatch(FetchLOFinal({
          type: "Bar",
          studentId: studentID,
          class_id: classID,
          final_exam_id: chosenBarFinal
          
          }))
      }

      fetchBarData();

    }


  },[chosenBarFinal])

  // Bar Chart


  //Radar Chart 
  useEffect(()=>{

    if(chosenRadarFinal)
    {
      const fetchData = async ()=>{
        await dispatch(FetchLOFinal({
          type: "Radar",
          studentId: studentID,
          class_id: classID,
          final_exam_id: chosenRadarFinal
          
          }))
      }

      fetchData();

    }


  },[chosenRadarFinal])

  
  //Radar Chart


  //Pie Chart
  useEffect(()=>{

    if(chosenPieFinal)
    {
      const fetchData = async ()=>{
        await dispatch(FetchLOFinal({
          type: "Pie",
          studentId: studentID,
          class_id: classID,
          final_exam_id: chosenPieFinal
          
          }))
      }

      fetchData();

    }


  },[chosenPieFinal])

  const finalChartPieData = useMemo(()=>{
      return finalExamDataPie
  },[finalExamDataPie]) 
  //Pie Chart



  //Line Chart
  useEffect(()=>{

    if(chosenLineFinal)
    {
      const fetchData = async ()=>{
        await dispatch(FetchLOFinal({
          type: "Line",
          studentId: studentID,
          class_id: classID,
          final_exam_id: chosenLineFinal
          
          }))
      }

      fetchData();

    }


  },[chosenLineFinal])

  const finalChartLineData = useMemo(()=>{
      return finalExamDataLine
  },[finalExamDataLine]) 

  //Line Chart


  //ASSIGNMENT

  const AssignmentChartData = useMemo(()=>{
    
    if(assignmentQuiz.length!=[]){
      var data = []
        for (let x in assignmentQuiz.radar){

            data.push({subject:x,Score:assignmentQuiz.radar[x], fullMark: 10 })
           
        }
        console.log(data)
        return data;
    }
    return []
  },[assignmentQuiz])
  
  //FINAL

  // BAR CHART
  const FinalBarData = useMemo(()=>{
    if(finalExamDataBar!=[]){
      var data = []
      finalExamDataBar?.questionScores?.map((item)=>{
        data.push({subject:item.questionName,Score:item.questionScore })
      })
        return data;
    }
    return []
  },[finalExamDataBar])

  const barDataFinal = {
    labels: FinalBarData.map(item => item.subject),
    datasets: [
      {
        label: 'Điểm',
        data: FinalBarData.map(item => item.Score),
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
  // BAR CHART

  //RADAR
  const FinalRadarData = useMemo(()=>{
   
    if(finalExamDataRadar!=[]){
      var data = []
      finalExamDataRadar?.questionScores?.map((item)=>{
        data.push({subject:item.questionName,Score:item.questionScore })
      })
        return data;
    }
    return []
  },[finalExamDataRadar])


  const FinalLineData = useMemo(()=>{
   
    if(finalExamDataLine!=[]){
      var data = []
      finalExamDataLine?.questionScores?.map((item)=>{
        data.push({subject:item.questionName,Score:item.questionScore })
      })
        return data;
    }
    return []
  },[finalExamDataLine])


  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLoChart = async () => {
      await dispatch(
        FetchLOChart({
          studentId: studentID,
          class_id: classID,
        })
      );

      await dispatch(fetchAllExam({ instructor_id: userId, class_id: classID }));
    };
    fetchLoChart();
  }, [router.query, classID, studentID]);


const dataFinal = [
  { subject: 'LO1', Score: 8, fullMark: 10 },
  { subject: 'LO2', Score: 9, fullMark: 10 },
  { subject: 'LO3', Score: 2, fullMark: 10 },
  { subject: 'LO4', Score: 9, fullMark: 10 },
  { subject: 'LO5', Score: 4, fullMark: 10 },
  { subject: 'LO6', Score: 6, fullMark: 10 },
];


  const barDataAssignment = {
    labels: AssignmentChartData.map(item => item.subject),
    datasets: [
      {
        label: 'Điểm',
        data: AssignmentChartData.map(item => item.Score),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };
  


  const countAssignment = {
    dat: AssignmentChartData.filter(item => item.Score > 5).length,
    khongdat: AssignmentChartData.filter(item => item.Score <= 5).length,
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
  
  const COLORS = ['#4CAF50', '#E53935'];

    

    


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
                      Điểm theo từng câu hỏi của các bài Cuối Kỳ
                      </Typography>
                      <Typography variant="body2" color="#64748b">
                      Phân bố xếp điểm các câu hỏi trong các bài Cuối Kỳ của sinh viên.
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
                            value={chosenBarFinal || ""}
                            label="Bài kiểm tra"
                            onChange={(e) => setChosenBarFinal(e.target.value)}
                          >
                            {Array.isArray(finalExams) && finalExams.map((item) => (
                              <MenuItem value={item.finalExamId} key={item.finalExamId}>
                                Bài kiểm tra {item.finalExamId}
                              </MenuItem>
                            ))}
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
              
              <RadarChart data={AssignmentChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis  domain={[0, 10]} />
                  <Radar name="Điểm" dataKey="Score" stroke="#8884d8" fill="rgba(54, 162, 235, 0.5)" fillOpacity={0.6} />
                  <Tooltip />
              </RadarChart>
            
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
                        Năng lực theo từng câu hỏi của các bài Cuối Kỳ
                      </Typography>
                      <Typography variant="body2" color="#64748b">
                      Tổng hợp năng lực theo các câu hỏi trong các bài Cuối Kỳ của sinh viên.
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
                            value={chosenRadarFinal || ""}
                            label="Bài kiểm tra"
                            onChange={(e) => setChosenRadarFinal(e.target.value)}
                          >
                             {Array.isArray(finalExams) && finalExams.map((item) => (
                              <MenuItem value={item.finalExamId} key={item.finalExamId}>
                                Bài kiểm tra {item.finalExamId}
                              </MenuItem>
                            ))}
                          </Select>
                    </FormControl>
                    </Box>
              </Grid>

            </Grid>
            <ResponsiveContainer width="100%" height={300}>
              
              <RadarChart data={FinalRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Điểm" dataKey="Score" stroke="rgba(199, 72, 99, 0.62)" fill="rgba(255, 99, 132, 0.5)" fillOpacity={0.6} />
                  <Tooltip />
              </RadarChart>
            
            </ResponsiveContainer>


          </ChartBox>
          
        </ChartContainer1>
      </ChartContainer>

      {/* <ChartContainer>
            

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
                <LineChart data={AssignmentChartData}>
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
                        Diễn biến điểm của từng câu hỏi của theo các bài Cuối Kỳ
                      </Typography>
                      <Typography variant="body2" color="#64748b">
                      Tổng hợp diễn biến điểm của từng câu hỏi theo các bài Cuối Kỳ sinh viên.
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
                          value={chosenLineFinal || ""}
                          label="Bài kiểm tra"
                          onChange={(e) => setChosenLineFinal(e.target.value)}
                        >

                        {Array.isArray(finalExams) && finalExams.map((item) => (
                            <MenuItem value={item.finalExamId} key={item.finalExamId}>
                              Bài kiểm tra {item.finalExamId}
                            </MenuItem>
                          ))}
                        </Select>
                  </FormControl>
          </Box>
          </Grid>

        </Grid>

          <ResponsiveContainer width="100%" height={350}>
                <LineChart data={FinalLineData}>
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
      </ChartContainer> */}

      {/* <ChartContainer>
      


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
                   
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                   
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieDataAssignment.map((entry, index) => (
                      <Cell key={`cell-assignment-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip></Tooltip>
                  
                </PieChart>
              </ResponsiveContainer>
          </ChartBox>

          
          
        </ChartContainer1>
      </ChartContainer> */}
      

      


    </LearningOutcomeBody>
  );
}
