import React, { useState, useEffect, useMemo } from "react";

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
import UpdateAssignTableModal from "./UpdateAssignTableModal";
import UpdateExamTable from "./UpdateExamTable";
export default function EditExamModal({ open, onClose,mode,StudentData,ExamData,handleUpdateExam }) {

  const HandleSaveAssignment = (studentInfo,scores,quizName)=>{
    console.log("ExamData: ",ExamData)
      const AssignmentData = studentInfo.map((student) => {
                  const studentScores = scores[student.studentId] || {};
                      return {
                      activityId: student.activityId,
                      assignmentScore: studentScores
                      };
            });

            const result = {
              assignmentName: quizName,
              assignmentData: AssignmentData,
            };

            handleUpdateExam(ExamData.assignmentId,mode,result)
      // handleCreateExam("assignment",result)
    }

  const HandleSaveExam = (mode,studentInfo,scores,questions,times,quizName)=>{
    
    console.log("mode: ",mode)
      if(mode=="quiz"){
            const quizData = studentInfo.map((student) => {
            const studentScores = scores[student.studentId] || {};
            const questionsList = questions.map((q, index) => {
              const rawScore = studentScores[q];
              const score = Number(rawScore) || 0; 
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

            // console.log("Kết quả:", result);
            handleUpdateExam(ExamData.quizId,mode,result)
           
        }
        else if(mode=="final_exam"){
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
            handleUpdateExam(ExamData.finalExamId,mode,result)
            // handleCreateExam("final_exam",result)
        }
    }


  const ExamName = useMemo(()=>{
    if(mode=="quiz")              return ExamData?.quizName;
      else if(mode=="assignment")   return ExamData?.assignmentName;
        else if(mode=="final_exam")   return ExamData?.finalExamName;
    return ""
  },[mode])


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
          Sửa {mode} 
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        
          <div style={{paddingInline:"16px"}}>
                    {mode ==="assignment"?
                    <UpdateAssignTableModal 
                      studentInfo={StudentData} 
                      mode={mode} 
                      HandleSaveAssignment={HandleSaveAssignment} 
                      onClose={onClose}
                      
                      examData={ExamData}
                      > </UpdateAssignTableModal>
                    :
                    <UpdateExamTable 
                      studentInfo={StudentData} 
                      examData={ExamData}
                      mode={mode} 
                      HandleSaveExam={HandleSaveExam} 
                      onClose={onClose}
                      
                    ></UpdateExamTable>
                  }
                    
              </div>
            
      </DialogContent>
    </Dialog>
  );
}
