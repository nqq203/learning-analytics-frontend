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


function UpdateQuizTable({ data,QuizName }) {
  const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState({});
  const [times, setTimes] = useState({});

  // Khởi tạo dữ liệu ban đầu từ props
  useEffect(() => {
    if (data && data.length > 0) {
      // Tổng hợp tất cả câu hỏi xuất hiện trong data
      const allQuestions = new Set();
      const newScores = {};
      const newTimes = {};

      data.forEach((student) => {
        newTimes[student.MSSV] = student.time || "";
        newScores[student.MSSV] = student.scores || {};

        Object.keys(student.scores || {}).forEach((q) =>
          allQuestions.add(q)
        );
      });

      setQuestions(Array.from(allQuestions));
      setScores(newScores);
      setTimes(newTimes);
    }
  }, [data]);

  const handleAddQuestion = () => {
    const newQuestion = `Câu ${questions.length + 1}`;
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleDeleteQuestion = (questionToDelete) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xoá "${questionToDelete}"?`)) return;

    setQuestions((prev) => prev.filter((q) => q !== questionToDelete));

    setScores((prev) => {
      const updated = {};
      for (const mssv in prev) {
        const { [questionToDelete]: _, ...rest } = prev[mssv] || {};
        updated[mssv] = rest;
      }
      return updated;
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
    const result = data.map((student) => ({
      MSSV: student.MSSV,
      name: student.name,
      time: times[student.MSSV] || "",
      scores: scores[student.MSSV] || {},
    }));
    console.log("Kết quả:", result);
    alert("Dữ liệu đã được lưu! Kiểm tra console log.");
  };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>

         <div>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Tên bài kiểm tra:</Typography>
                  <TextField 
                  variant="outlined"
                  value={QuizName}
                              size="small"
                  placeholder="Nhập tên"/>
        </div>

      <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Điểm cho học sinh:</Typography>

      <button onClick={handleAddQuestion}>➕ Thêm câu hỏi</button>
        <TableContainer
        component={Paper}
               className="TableContainer"
               style={{
                  
                  maxHeight: "350px",
                  overflow: "auto",
                }}
        
        >
      <Table stickyHeader
       
      >
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
          {data.map((student) => (
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
      
    </div>
  );
}

export default UpdateQuizTable;
