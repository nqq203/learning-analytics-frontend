import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Box,
  Button
} from "@mui/material";

import {
  Add,
  FileDownload,
  Info,
} from "@mui/icons-material";

import IconButton from '@mui/material/IconButton';

import { useEffect, useMemo, useState, useRef } from "react";

const UpdateExamTable = ({
  studentInfo,
  mode,
  HandleSaveExam,
  onClose,
  examData
}) => {
    // useEffect(()=>{
    //   console.log("examData: ",examData)
    //   console.log("studentInfo: ",studentInfo)

    // },[studentInfo,examData])

   
    const [scores, setScores] = useState({});
    const [questions, setQuestions] = useState([]);
    const [times, setTimes] = useState({});
    const [quizName, setQuizName] = useState();

    useEffect(()=>{
      if(examData) {
        if(mode=="quiz") setQuizName(examData.quizName)
        else if(mode=="final_exam") setQuizName(examData.finalExamName)
          else if(mode=="midterm_exam") setQuizName(examData.midtermExamName)
        // setQuizName(mode=="quiz"? examData.quizName : examData.finalExamName)
      
      }
    },[examData])

    useEffect(()=>{
      if(mode=="quiz"){
        studentInfo.map((item)=>{
          setTimes((prev) => ({
            ...prev,
            [item.studentId]: item.duration,
          }));
        })

        if (studentInfo[0]?.questions) {
          const newQuestions = studentInfo[0].questions.map((item, index) => `Câu ${index + 1}`);
          setQuestions(newQuestions);
        }

        studentInfo?.map((student)=>{
            student.questions.map((q,index)=>{
                const questionIntial = `Câu ${index + 1}`;
                setScores((prev) => ({
                  ...prev,
                  [student.studentId]: {
                    ...prev[student.studentId],
                    [questionIntial]: q.score,
                  },
                }));
            })
        })

      }
      else{
        if (studentInfo[0]?.questions) {
          const newQuestions = studentInfo[0].questions.map((item, index) => `Câu ${index + 1}`);
          setQuestions(newQuestions);
        }


        studentInfo?.map((student)=>{
            student.questions.map((q,index)=>{
                const questionIntial = `Câu ${index + 1}`;
                setScores((prev) => ({
                  ...prev,
                  [student.studentId]: {
                    ...prev[student.studentId],
                    [questionIntial]: q.score,
                  },
                }));
            })
        })

      }
    },[studentInfo])
    

  const handleAddQuestion = () => {
    const newQuestion = `Câu ${questions.length + 1}`;
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionToDelete) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá "${questionToDelete}"?`)) return;

    // Xoá khỏi danh sách câu hỏi
    setQuestions((prev) => prev.filter((q) => q !== questionToDelete));

    // Xoá điểm của câu hỏi đó trong từng sinh viên
    setScores((prev) => {
      const updatedScores = {};
      for (const mssv in prev) {
        const { [questionToDelete]: _, ...restScores } = prev[mssv] || {};
        updatedScores[mssv] = restScores;
      }
      return updatedScores;
    });
  };

  const handleScoreChange = (mssv, question, value) => {
    setScores((prev) => ({
      ...prev,
      [mssv]: {
        ...prev[mssv],
        [question]: value,
      },
    }));
  };

  const handleTimeChange = (mssv, value) => {
    setTimes((prev) => ({
      ...prev,
      [mssv]: value,
    }));
  };

  const handleSave = () => {
   
     HandleSaveExam(mode,studentInfo,scores,questions,times,quizName)
  };

  

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"1rem", fontFamily: "Arial" }}>

      
        <div>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Tên bài {mode}:</Typography>

          <TextField 
          variant="outlined"
                      size="small"
          placeholder="Nhập tên bài"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          />
          
        </div>


        
     

      
      <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Nhập điểm cho học sinh:</Typography>
      <TableContainer
       component={Paper}
       className="TableContainer"
       style={{
          
          maxHeight: "550px",
          overflow: "auto",
        }}
        
      >
        <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bold",fontSize:"12px"}} >MSSV</TableCell>
            {mode==="quiz" &&( <TableCell style={{fontWeight:"bold",fontSize:"12px"}} >Thời gian làm bài</TableCell> )}
            
            {questions.map((q, index) => (
              <TableCell key={index} style={{fontWeight:"bold",fontSize:"12px"}} >
                {q}
                <button
                  onClick={() => handleDeleteQuestion(q)}
                  style={{
                    marginLeft: "6px",
                    color: "white",
                    backgroundColor: "red",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                  title={`Xoá ${q}`}
                >
                  ×
                </button>
              </TableCell>
            ))}

            <TableCell style={{fontWeight:"bold",fontSize:"12px"}}>
              <IconButton onClick={handleAddQuestion}>
                        <Add color="primary" alt="Thêm câu hỏi"/>
              </IconButton>
             
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentInfo?.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell style={{fontSize:"10px"}} >{student.identificationCode}</TableCell>

              
              {mode==="quiz" &&(
                  <TableCell style={{fontSize:"10px"}} >
                      <input
                        type="text"
                        style={{border:"none",width:"50%"}}
                        placeholder="Nhập thời gian"
                        value={times[student.studentId] || ""}
                        onChange={(e) =>
                          handleTimeChange(student.studentId, e.target.value)
                        }
                      />
              </TableCell>

              )}
              
              
              {questions.map((q, index) => (
                <TableCell key={index} style={{fontSize:"10px"}} >
                  <input
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Nhập điểm"
                    style={{border:"none",width:"100%"}}
                    value={scores[student.studentId]?.[q] || ""}
                    onChange={(e) =>
                      handleScoreChange(student.studentId, q, e.target.value)
                    }
                  />
                </TableCell>
              ))}
              <TableCell style={{fontSize:"10px"}} ></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      
          


      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            
          }}
        >
          <Button variant="outlined" onClick={onClose} sx={{ width: "48%" }}>
            ĐÓNG
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={()=>handleSave()}
            sx={{ width: "48%" }}
          >
            LƯU
          </Button>
        </Box>


      
    </div>
  );
};

export default UpdateExamTable;
