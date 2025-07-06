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
import { toast } from "react-toastify";
import { useEffect, useMemo, useState, useRef } from "react";

const AssignmentTableModal = ({
  studentInfo,
  mode,
  HandleSaveAssignment,
  onClose
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
        if(quizName.trim() === "" || Object.keys(scores).length === 0) {
          toast.error(`Vui lòng nhập tên assignment và điểm của Assignment`);
        }
        else  {
          HandleSaveAssignment(studentInfo,scores,quizName)
        }
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

export default AssignmentTableModal;
