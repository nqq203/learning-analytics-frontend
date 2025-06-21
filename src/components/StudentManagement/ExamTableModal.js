import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
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

const ExamTableModal = ({
  students
}) => {
   const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState({});
  const [times, setTimes] = useState({});

  // Thêm câu hỏi mới
  const handleAddQuestion = () => {
    const newQuestion = `Câu ${questions.length + 1}`;
    setQuestions([...questions, newQuestion]);
  };

  // Cập nhật điểm
  const handleScoreChange = (mssv, question, value) => {
    setScores((prev) => ({
      ...prev,
      [mssv]: {
        ...prev[mssv],
        [question]: value,
      },
    }));
  };

  // Cập nhật thời gian làm bài
  const handleTimeChange = (mssv, value) => {
    setTimes((prev) => ({
      ...prev,
      [mssv]: value,
    }));
  };

  // Xử lý khi bấm Lưu
  const handleSave = () => {
    const result = students.map((student) => ({
      MSSV: student.MSSV,
      name: student.name,
      time: times[student.MSSV] || "",
      scores: scores[student.MSSV] || {},
    }));

    console.log("Kết quả:", result);
    alert("Dữ liệu đã được lưu! Xem console log để kiểm tra.");
  };

  

  return (
    <>
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Bảng điểm Quiz</h2>
      <button onClick={handleAddQuestion}>➕ Thêm câu hỏi</button>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Thời gian làm bài</th>
            {questions.map((q, index) => (
              <th key={index}>{q}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.MSSV}>
              <td>{student.MSSV}</td>
              <td>{student.name}</td>
              <td>
                <input
                  type="text"
                  placeholder="VD: 25 phút"
                  value={times[student.MSSV] || ""}
                  onChange={(e) => handleTimeChange(student.MSSV, e.target.value)}
                />
              </td>
              {questions.map((q, index) => (
                <td key={index}>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={scores[student.MSSV]?.[q] || ""}
                    onChange={(e) =>
                      handleScoreChange(student.MSSV, q, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

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
        }}
      >
        💾 Lưu
      </button>
    </div>
    </>
  );
};

export default ExamTableModal;
