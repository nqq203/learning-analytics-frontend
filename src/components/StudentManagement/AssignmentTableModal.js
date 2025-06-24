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

const AssignmentTableModal = ({
  studentInfo,
  mode
}) => {
  const [quizName, setQuizName] = useState("");
   const [questions, setQuestions] = useState([]);
  const [scores, setScores] = useState({});
  const [times, setTimes] = useState({});


  const handleScoreChange = (mssv, value) => {
    setScores((prev) => ({
        ...prev,
        [mssv]: parseFloat(value) || 0, // chuyển thành số, fallback về 0 nếu không hợp lệ
        }));
  };

 

  const handleSave = () => {
      
          const AssignmentData = studentInfo.map((student) => {
                const studentScores = scores[student.studentId] || {};
                    return {
                    studentId: student.studentId,
                    assignmentScore: studentScores
                    };
          });

          const result = {
            assignmentName: quizName,
            assignmentData: AssignmentData,
          };

          console.log("Kết quả:", result);
          alert("Dữ liệu đã được lưu! Xem console log để kiểm tra.");
      
    
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
            
            
            

            <TableCell>
                    Điểm của bài Assignment
             
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentInfo.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell>{student.identificationCode}</TableCell>

              <TableCell>
                <input
                  type="text"
                  style={{border:"none",width:"50%"}}
                  placeholder="Nhập điểm"
                  value={scores[student.studentId] || ""}
                  onChange={(e) =>
                    handleScoreChange(student.studentId, e.target.value)
                  }
                />
              </TableCell>
              
              
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

export default AssignmentTableModal;
