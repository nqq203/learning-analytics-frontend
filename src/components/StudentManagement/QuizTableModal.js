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
import { toast } from "react-toastify";
import { useEffect, useMemo, useState, useRef } from "react";

const QuizTableModal = ({
  studentInfo,
  mode,
  HandleSaveExam,
  onClose
}) => {
  const [quizName, setQuizName] = useState("");
   const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState({});
  const [times, setTimes] = useState({});

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
    if(quizName.trim() === "" || Object.keys(questions).length === 0) {
      toast.error(`Vui lòng nhập tên và câu hỏi của bài kiểm tra`);
    }
    else
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
            <TableCell>MSSV</TableCell>
            {mode==="Quiz" &&( <TableCell>Thời gian làm bài</TableCell> )}
            
            {questions.map((q, index) => (
              <TableCell key={index}>
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

            <TableCell>
              <IconButton onClick={handleAddQuestion}>
                        <Add color="primary" alt="Thêm câu hỏi"/>
              </IconButton>
             
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentInfo.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell>{student.identificationCode}</TableCell>
              {mode==="Quiz" &&(
                  <TableCell>
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
                <TableCell key={index}>
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
              <TableCell></TableCell>
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

export default QuizTableModal;
