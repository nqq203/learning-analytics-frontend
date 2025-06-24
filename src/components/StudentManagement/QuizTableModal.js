import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField
} from "@mui/material";


import {
  ActionButton,
  Container,
  Header,
} from "@/components/Analytics/Styles/Styles";
import {
  Add,
  FileDownload,
  Info,
} from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { TableWrapper } from "../Analytics/Styles/Styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fragment, use } from "react";
import { useEffect, useMemo, useState, useRef } from "react";

const QuizTableModal = ({
  studentInfo,
  mode
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
      if(mode=="Quiz"){
          const quizData = studentInfo.map((student) => {
          const studentScores = scores[student.studentId] || {};
          const questionsList = questions.map((q, index) => {
            const rawScore = studentScores[q];
            const score = Number(rawScore) || 0; // đảm bảo là số, nếu undefined thì thành 0
            return {
              questionNumber: index + 1,
              score: score,
            };
          });

          
          const quizScore = questionsList.reduce((acc, q) => acc + q.score, 0);

            return {
              studentId: student.studentId,
              duration: Number(times[student.studentId]) || 0,
              quizScore,
              questions: questionsList,
            };
          });

          const result = {
            quizName: quizName,
            quizData: quizData,
          };

          console.log("Kết quả:", result);
          alert("Dữ liệu đã được lưu! Xem console log để kiểm tra.");
      }
      else if(mode=="Cuối Kỳ"){
        const finalData = studentInfo.map((student) => {
          const studentScores = scores[student.studentId] || {};
          const questionsList = questions.map((q, index) => {
            const rawScore = studentScores[q];
            const score = Number(rawScore) || 0; // đảm bảo là số, nếu undefined thì thành 0
            return {
              questionNumber: index + 1,
              score: score,
            };
          });

          
          const finalExamScore = questionsList.reduce((acc, q) => acc + q.score, 0);

            return {
              studentId: student.studentId,
              finalExamScore,
              questions: questionsList,
            };
          });

          const result = {
            finalExamName: quizName,
            finalExamData: finalData,
          };

          console.log("Kết quả:", result);
          alert("Dữ liệu đã được lưu! Xem console log để kiểm tra.");
      }
        

    
  
  };

  

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"1rem", fontFamily: "Arial" }}>

      
        <div>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Tên bài quiz:</Typography>
          <TextField 
          variant="outlined"
                      size="small"
          placeholder="Nhập tên bài Quiz"
          onChange={(e) => setQuizName(e.target.value)}
          />
        </div>


        
     

      
      <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Nhập điểm cho học sinh:</Typography>
      <TableContainer
       component={Paper}
       className="TableContainer"
       style={{
          
          maxHeight: "350px",
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
      

      <button
        onClick={handleSave}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        💾 Lưu
      </button>
    </div>
  );
};

export default QuizTableModal;
