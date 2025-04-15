import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Dữ liệu mẫu
const sampleData = [
  { id: 1, mssv: "21127001", name: "Nguyễn Văn A", score: 10, timeTaken: "10m22s", deviation: "24m38s", reason: "Làm quá nhanh so với trung bình" },
  { id: 2, mssv: "21127002", name: "Nguyễn Văn B", score: 10, timeTaken: "09m15s", deviation: "25m45s", reason: "Làm quá nhanh so với trung bình" },
];

const FraudDetection = () => {
  const [subject, setSubject] = useState("");
  const [test, setTest] = useState("");
  const [data, setData] = useState(sampleData);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);


  const handleOpenDialog1 = () => {
    setOpenDialog1(true);
  };

  const handleCloseDialog1 = () => {
    setOpenDialog1(false);
  };

  const handleOpenDialog2 = () => {
    setOpenDialog1(false);
    setOpenDialog2(true);
  };

  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
  };

  const handleOpenDialog3 = () => {
    setOpenDialog1(false);
    setOpenDialog3(true);
  };

  // Hàm đóng dialog
  const handleCloseDialog3 = () => {
    setOpenDialog3(false);
  };

  return (
    <Container>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" my={2}>
        Phân tích Phát hiện gian lận
      </Typography>

      {/* Bộ lọc + Button */}
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={4}>
          <TextField label="Môn học" value={subject} onChange={(e) => setSubject(e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={4}>
          <Select value={test} onChange={(e) => setTest(e.target.value)} fullWidth displayEmpty>
            <MenuItem value=""><Typography>Bài kiểm tra</Typography></MenuItem>
            <MenuItem value="Quiz 1">Quiz 1</MenuItem>
            <MenuItem value="Quiz 2">Quiz 2</MenuItem>
            <MenuItem value="Giữa kỳ">Giữa kỳ</MenuItem>
            <MenuItem value="Cuối kỳ">Cuối kỳ</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleOpenDialog1}>
            Thiết lập ngưỡng
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary" fullWidth>
            Phân tích
          </Button>
        </Grid>
      </Grid>

      {/* Dialog 1: Thông báo chưa thiết lập ngưỡng */}
      <Dialog open={openDialog1} onClose={handleCloseDialog1} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          NGƯỠNG CHƯA ĐƯỢC THIẾT LẬP
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          <NotificationsIcon sx={{ fontSize: 60, color: "#007AFF" }} />
          <Typography sx={{ mt: 2, color: "gray" }}>
            Bạn chưa thiết lập ngưỡng. Thiết lập ngưỡng của bạn hoặc tiếp tục với ngưỡng mặc định để tiếp tục phân tích.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" onClick={handleCloseDialog1}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "purple", color: "white" }} onClick={handleOpenDialog3}>
            THIẾT LẬP
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#007AFF", color: "white" }} onClick={handleOpenDialog2}>
            TIẾP TỤC
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog 2: Hiển thị ngưỡng mặc định */}
      <Dialog open={openDialog2} onClose={handleCloseDialog2} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}>
          THÔNG TIN NGƯỠNG MẶC ĐỊNH
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          <Box sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>
            <Typography variant="body1"><b>1. MIN TIME:</b> 10m <span style={{ float: "right" }}><b>MAX TIME:</b> 40m</span></Typography>
          </Box>
          <Box sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>
            <Typography variant="body1"><b>2. DEVIATION FROM MEAN:</b></Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>Standard Deviation: 2.5 ・ Mean Time: 35m</Typography>
          </Box>
          <Box sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 1 }}>
            <Typography variant="body1"><b>3. SCORE-TIME CORRELATION:</b></Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>Mean Time: 35m</Typography>
          </Box>
          <Box>
            <Typography variant="body1"><b>4. ANOMALY SCORE:</b></Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>0.8 (0 - 1)</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" sx={{ width: "120px" }} onClick={handleCloseDialog2}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#007AFF", color: "white", width: "120px" }} onClick={handleCloseDialog2}>
            XÁC NHẬN
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog 3: THIẾT LẬP NGƯỠNG */}
      <Dialog open={openDialog3} onClose={handleCloseDialog3} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}>
          THIẾT LẬP NGƯỠNG
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          
          {/* Ngưỡng tối thiểu/tối đa */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>1. Ngưỡng tối thiểu / tối đa:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Min Time (mm:ss)" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Max Time (mm:ss)" variant="outlined" size="small" />
            </Grid>
          </Grid>

          {/* Ngưỡng sai lệch so với trung bình */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 3 }}>2. Ngưỡng sai lệch so với trung bình:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Standard Deviation" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Mean Time" variant="outlined" size="small" />
            </Grid>
          </Grid>

          {/* Ngưỡng thời gian làm bài so với điểm số */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 3 }}>3. Ngưỡng thời gian làm bài so với điểm số:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Mean Time" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Score Standard" variant="outlined" size="small" />
            </Grid>
          </Grid>

          {/* Ngưỡng điểm bất thường */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 3 }}>4. Ngưỡng điểm bất thường:</Typography>
          <TextField fullWidth label="Anomaly Score" variant="outlined" size="small" sx={{ mt: 1 }} />

        </DialogContent>
        
        {/* HỦY và XÁC NHẬN */}
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" sx={{ width: "120px" }} onClick={handleCloseDialog3}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#007AFF", color: "white", width: "120px" }} onClick={handleCloseDialog3}>
            XÁC NHẬN
          </Button>
        </DialogActions>
      </Dialog>
      {/* Bảng dữ liệu */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">MSSV</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Họ và Tên</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Điểm số</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Thời gian làm bài</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Chênh lệch</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Nguyên nhân</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.mssv}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.score}</TableCell>
                <TableCell>{row.timeTaken}</TableCell>
                <TableCell>{row.deviation}</TableCell>
                <TableCell>{row.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default FraudDetection;