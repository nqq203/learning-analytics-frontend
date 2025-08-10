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


export default function ViewTable({ QuizName, ExamData, type }) {
  // Tìm số câu hỏi tối đa để đảm bảo tất cả cột được hiển thị đúng
  const maxQuestions = useMemo(() => {
    if (!ExamData || ExamData.length === 0) return 0;
    return Math.max(...ExamData.map(student => student?.questions?.length || 0));
  }, [ExamData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>Tên bài kiểm tra:</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{QuizName}</Typography>

      </div>

      <TableContainer
        component={Paper}
        className="TableContainer"
        style={{

          maxHeight: "550px",
          overflow: "auto",
        }}

      >
        <Table stickyHeader

        >
          <TableHead>
            <TableRow >
              <TableCell style={{ fontWeight: "bold", fontSize: "12px" }} >MSSV</TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "12px" }} >Điểm tổng kết</TableCell>
              {
                (type === "quiz" || type === "final_exam" || type === "midterm_exam") && (
                  <>
                    {type === "quiz" && (<TableCell style={{ fontWeight: "bold", fontSize: "12px" }} >Thời gian làm bài</TableCell>)}

                    {Array.from({ length: maxQuestions }, (_, index) => (
                      <TableCell key={index} style={{ fontWeight: "bold", fontSize: "12px" }}>
                        Câu {index + 1}
                      </TableCell>
                    ))}
                  </>
                )
              }

              <TableCell style={{ fontWeight: "bold", fontSize: "12px" }} >Ngày tạo</TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "12px" }} >Ngày cập nhập</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {ExamData?.map((student) => (
              <TableRow key={student.MSSV}>
                <TableCell style={{ fontSize: "10px" }} >{student.identificationCode || "--"}</TableCell>
                <TableCell style={{ fontSize: "11px" }} >{student.activityScore}</TableCell>
                {
                  (type === "quiz" || type === "final_exam" || type === "midterm_exam") && (
                    <>
                      {type === "quiz" && (<TableCell style={{ fontSize: "11px" }} >{student.duration}</TableCell>)}

                      {Array.from({ length: maxQuestions }, (_, index) => {
                        const questionScore = student?.questions?.find(q => q.questionNumber === index + 1)?.score;
                        return (
                          <TableCell key={index} style={{ fontSize: "11px" }} >
                            {questionScore !== undefined ? questionScore : "--"}
                          </TableCell>
                        );
                      })}
                    </>
                  )
                }
                <TableCell style={{ fontSize: "11px" }} >{student.createdDate || "--"}</TableCell>
                <TableCell style={{ fontSize: "11px" }}>{student.updatedDate || "--"}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
}


