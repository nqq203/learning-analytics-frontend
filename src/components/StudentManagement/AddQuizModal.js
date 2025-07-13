  import React, { useState, useEffect } from "react";
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    IconButton,
    Typography,
    Tabs,
    Tab,
    Grid,
    Divider,
  } from "@mui/material";
  import { Close } from "@mui/icons-material";
  import QuizTableModal from "./QuizTableModal";
  import AssignmentTableModal from "./AssignmentTableModal";

  export default function AddQuizModal({ open, onClose, onSave,mode,students,handleCreateExam }) {
    
    const HandleSaveAssignment = (studentInfo,scores,quizName)=>{
      const AssignmentData = studentInfo.map((student) => {
                  const studentScores = scores[student.studentId] || 0;
                      return {
                      studentId: student.studentId,
                      assignmentScore: studentScores
                      };
            });

            const result = {
              assignmentName: quizName,
              assignmentData: AssignmentData,
            };

            
            
      handleCreateExam("assignment",result)
      onClose();
    }

    const HandleSaveExam = (mode,studentInfo,scores,questions,times,quizName)=>{
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
            
            handleCreateExam("quiz",result)
            onClose();
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
           
            handleCreateExam("final_exam",result)
            onClose();
        }
        else if(mode=="Giữa Kỳ"){
          const midtermData = studentInfo.map((student) => {
            const studentScores = scores[student.studentId] || {};
            const questionsList = questions.map((q, index) => {
              const rawScore = studentScores[q];
              const score = Number(rawScore) || 0; // đảm bảo là số, nếu undefined thì thành 0
              return {
                questionNumber: index + 1,
                score: score,
              };
            });

            
            const midtermExamScore = questionsList.reduce((acc, q) => acc + q.score, 0);

              return {
                studentId: student.studentId,
                midtermExamScore,
                questions: questionsList,
              };
            });

            const result = {
              midtermExamName: quizName,
              midtermExamData: midtermData,
            };

            // console.log("Kết quả:", result);
           
            handleCreateExam("midterm_exam",result)
            onClose();
        }
    }

    return (
      <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
        <DialogTitle
          sx={{
            
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            Thêm bài {mode} Vào Lớp
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <Close />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ p: 3 }}>
          

              
              <div style={{paddingInline:"16px"}}>
                    {mode ==="Assignment"?
                    <AssignmentTableModal studentInfo={students} mode={mode} HandleSaveAssignment={HandleSaveAssignment} onClose={onClose} > </AssignmentTableModal>
                    :
                    <QuizTableModal studentInfo={students} mode={mode} HandleSaveExam={HandleSaveExam} onClose={onClose}></QuizTableModal>
                  }
                    
              </div>
            
        </DialogContent>
      </Dialog>
    );
  }
