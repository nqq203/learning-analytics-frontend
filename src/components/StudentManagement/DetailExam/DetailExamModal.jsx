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


import ViewTable from "./ViewTable";

export default function DetailExamModal({ open, onClose,mode,StudentData,ExamData }) {
 

  const ExamName = useMemo(()=>{
    if(mode=="quiz")              return ExamData.quizName;
      else if(mode=="assignment")   return ExamData.assignmentName;
        else if(mode=="final_exam")   return ExamData.finalExamName;
    
  },[ExamData])


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
          Xem chi tiết bài {mode} 
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        
           <div style={{paddingInline:"16px"}}>
                  <ViewTable QuizName={ExamName} ExamData={StudentData} type={mode}></ViewTable>
            </div>
            
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={onClose} sx={{ width: "100%" }}>
            ĐÓNG
          </Button>
          
        </Box>
      </DialogContent>
    </Dialog>
  );
}
