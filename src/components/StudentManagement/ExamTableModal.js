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
  Add,
  FileDownload,
  Info,
} from "@mui/icons-material";

import IconButton from '@mui/material/IconButton';

import { useEffect, useMemo, useState, useRef } from "react";

const ExamTableModal = ({
  students,
  mode
}) => {
   const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState({});
  const [times, setTimes] = useState({});

  const handleAddQuestion = () => {
    
    const newQuestion = mode =="Assignment"?`Bài ${questions.length + 1}` :`Câu ${questions.length + 1}`;
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
    const result = students.map((student) => ({
      MSSV: student.MSSV,
      name: student.name,
      time: times[student.MSSV] || "",
      scores: scores[student.MSSV] || {},
    }));

    // console.log("Kết quả:", result);
    alert("Dữ liệu đã được lưu! Xem console log để kiểm tra.");
  };

  

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>

      
        <div>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Tên bài kiểm tra:</Typography>
          <TextField 
          variant="outlined"
                      size="small"
          placeholder="Nhập tên"/>
        </div>

     

      
      <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Nhập điểm cho học sinh:</Typography>
      <TableContainer
       component={Paper}
       className="TableContainer"
       style={{
          
          maxHeight: "350px",
          overflow: "auto",
        }}
        // border="1"
        // cellPadding="8"
        // cellSpacing="0"
        // style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>MSSV</TableCell>
            <TableCell>Họ tên</TableCell>
            <TableCell>Thời gian làm bài</TableCell>
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
          {students.map((student) => (
            <TableRow key={student.MSSV}>
              <TableCell>{student.MSSV}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>
                <input
                  type="text"
                  style={{border:"none",width:"50%"}}
                  placeholder="Nhập thời gian"
                  value={times[student.MSSV] || ""}
                  onChange={(e) =>
                    handleTimeChange(student.MSSV, e.target.value)
                  }
                />
              </TableCell>
              {questions.map((q, index) => (
                <TableCell key={index}>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Nhập điểm"
                    style={{border:"none",width:"100%"}}
                    value={scores[student.MSSV]?.[q] || ""}
                    onChange={(e) =>
                      handleScoreChange(student.MSSV, q, e.target.value)
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
      

      {/* <button
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
      </button> */}
    </div>
  );
};

export default ExamTableModal;
