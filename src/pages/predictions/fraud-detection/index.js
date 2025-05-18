import React, { useState,useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton

} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { fetchClassesByLecturer,fetchFraudDetect } from "@/redux/thunk/fraudDetectionThunk";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";

import InputAdornment from '@mui/material/InputAdornment';
import { TableFraudDetection } from "@/components/FraudDetection/TableFraudDetection";
import { Dialog1 } from "@/components/FraudDetection/Dialog1";
import { Dialog2 } from "@/components/FraudDetection/Dialog2";
import { Dialog3 } from "@/components/FraudDetection/Dialog3";
import { useDispatch, useSelector } from "react-redux";
// Dữ liệu mẫu
const sampleData = [
  { id: 1, mssv: "21127001", name: "Nguyễn Văn A", score: 10, timeTaken: "10m22s", deviation: "24m38s", reason: "Làm quá nhanh so với trung bình" },
  { id: 2, mssv: "21127002", name: "Nguyễn Văn B", score: 10, timeTaken: "09m15s", deviation: "25m45s", reason: "Làm quá nhanh so với trung bình" },
];

const FraudDetection = () => {
  const {classes,students} = useSelector(state=>state.fraudDetection);
  const dispatch = useDispatch();

  const [disabledTest,SetDisabledTest] = useState(true)
  const [disabledThreehold,SetDisabledThreehold] = useState(true)


  const [classesSelect, setClassesSelect] = useState("");
  const [quizSelect,setQuizSelect] = useState("");

  const [Quiz,SetQuiz] = useState([]);
  const userId="I0350";
  const [data, setData] = useState(sampleData);

  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);

  const [minTime,SetMinTime] = useState()
  const [maxTime,SetMaxTime] = useState()
  useEffect(() => {
    const fetchClasses = async () => {
      await dispatch(fetchClassesByLecturer({ userId }));
    }
    fetchClasses();
  }, [userId]);

  useEffect(()=>{
    setData(students);
    
  },[students])
  // useEffect(() => {
  //   console.log(classesSelect);
  //   console.log(quizSelect);
  //   console.log(minTime);
  //   console.log(maxTime);
  // }, [classesSelect,quizSelect,minTime,maxTime]);


  const handleOpenDialog1 = () => {
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
  };

  const handleOpenDialog2 = () => {
    setOpenDialog1(false);
    setOpenDialog2(true);
  };

  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
  };

  const handleOpenDialog3 = () => {
    setOpenDialog1(false);
    setOpenDialog3(true);
  };

  const handleCloseDialog3 = () => {
    setOpenDialog3(false);
  };

  const handleChosingClass = (classIdChosen) => {
    setClassesSelect(classIdChosen)
    if(classIdChosen){
      const foundClassess = classes.find(cls=>cls.classId == classIdChosen )
      SetQuiz(foundClassess.quizzes);
      SetDisabledTest(false)
    }
    

  };

  const handleChosingQuiz = (QuizIdChosen) =>{
        SetDisabledThreehold(false);
        setQuizSelect(QuizIdChosen);
    
  }

  const handleDetect = async ()=>{
      await dispatch(fetchFraudDetect({ userId,quiz_id:quizSelect,min_threshold:minTime,max_threshold:maxTime }));
  }
  
  

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}> {/* Set the container to full width */}

      {/* Bộ lọc + Button */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        
        <Grid item xs={12} sm={6} md={4}>
          <FormControl style={{ width: "30%", minWidth: 450 }} size="small">
            <InputLabel>Lớp</InputLabel>
          <Select
            label="Chọn lớp"
            value={classesSelect}
            onChange={(e) => handleChosingClass(e.target.value)}
            
          >
           
            {classes.map((item)=>{
              return <MenuItem value={item.classId}> {item.className}</MenuItem>
            })}
            
            

          </Select>

          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} >
          <FormControl style={{ width: "30%", minWidth: 450 }} size="small" disabled={disabledTest}>
              <InputLabel>Bài kiểm tra</InputLabel>
              <Select
                label="Chọn bài kiểm tra"
                value={quizSelect}
                onChange={(e) => handleChosingQuiz(e.target.value)}
                
              >
                

                {
                  Quiz.map((item)=>{
                    return <MenuItem value={item.quizId}>{item.quizName}</MenuItem>
                  })
                }
                
                
              </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <Button
            disabled={disabledThreehold}
            variant="contained"
            onClick={handleOpenDialog1}
            fullWidth
            sx={{
              backgroundColor: '#8E24AA',
              color: 'white', 
              '&:hover': {
                backgroundColor: '#7B1FA2',
              },
            }}
          >
            Thiết lập ngưỡng
          </Button>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <Button
            disabled={disabledThreehold}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#1976D2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#303F9F',
              },
            }}
            onClick={()=>handleDetect()}
          >
            Phân tích
          </Button>
        </Grid>
      </Grid>

      <Box
          sx={{
            borderBottom: "1.2px solid #ccc", 
            marginY: 3, 
          }}
        />
      {/* Bảng dữ liệu */}
      <TableFraudDetection data={data}></TableFraudDetection>

      {/* Dialogs */}

      <Dialog1 
      openDialog1={openDialog1} 
      handleCloseDialog1={handleCloseDialog1}
      handleOpenDialog3={handleOpenDialog3}
      handleOpenDialog2={handleOpenDialog2}
      ></Dialog1>

      {/* Dialog 2: Hiển thị ngưỡng mặc định */}

      
      <Dialog2 
        openDialog2={openDialog2} 
        handleCloseDialog2={handleCloseDialog2}
      >

      </Dialog2>


      {/* Dialog 3: THIẾT LẬP NGƯỠNG */}
      <Dialog3 
        openDialog3={openDialog3} 
        handleCloseDialog3={handleCloseDialog3}
        minTime={minTime}
        SetMinTime={SetMinTime}
        maxTime={maxTime}
        SetMaxTime={SetMaxTime}
      ></Dialog3>
    </Container>
  );
};

export default FraudDetection;
