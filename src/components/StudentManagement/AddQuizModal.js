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
import ExamTableModal from "./ExamTableModal";

const students = [
  { MSSV: "ST001", name: "Nguyễn Văn A" },
  { MSSV: "ST002", name: "Trần Thị B" },
  { MSSV: "ST003", name: "Lê Văn C" },
  { MSSV: "ST004", name: "Phạm Thị D" },
  { MSSV: "ST005", name: "Hoàng Văn E" },
  { MSSV: "ST006", name: "Đỗ Thị F" },
  { MSSV: "ST007", name: "Vũ Văn G" },
  { MSSV: "ST008", name: "Bùi Thị H" },
  { MSSV: "ST009", name: "Đặng Văn I" },
];

export default function AddQuizModal({ open, onClose, onSave,mode }) {
    

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
          Thêm {mode} Vào Lớp
        </Typography>
        <IconButton onClick={onClose} aria-label="close">
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ p: 3 }}>
        

            {mode=="Quiz"?
            <div style={{paddingInline:"16px"}}>
                  <QuizTableModal students={students}></QuizTableModal>
            </div>
          :  

          <div style={{paddingInline:"16px"}}>
                  <ExamTableModal students={students} mode={mode}></ExamTableModal>
            </div>
          }
           
        

        

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            mt: 2,
          }}
        >
          <Button variant="outlined" onClick={onClose} sx={{ width: "48%" }}>
            ĐÓNG
          </Button>
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSave}
            sx={{ width: "48%" }}
          >
            Lưu
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
