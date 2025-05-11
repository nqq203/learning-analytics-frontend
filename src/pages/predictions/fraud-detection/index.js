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
  IconButton

} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchClassesByLecturer } from "@/redux/thunk/analyticsThunk";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputAdornment from '@mui/material/InputAdornment';

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

  const handleCloseDialog3 = () => {
    setOpenDialog3(false);
  };

  const handleSearch = () => {
    console.log("Searching for:", subject);
  };

  return (
    <Container maxWidth={false} sx={{ padding: 2 }}> {/* Set the container to full width */}
      {/* Tiêu đề */}
      {/* <Typography variant="h5" fontWeight="bold" my={2} textAlign="center">
        Phân tích Phát hiện gian lận
      </Typography> */}

      {/* Bộ lọc + Button */}
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            variant="outlined"
            label="Môn học"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: "#1976D2",
                      borderRadius: "0 4px 4px 0",
                      padding: "10px",
                      height: "100%",
                      '&:hover': {
                        backgroundColor: "#1976d2", 
                      },
                    }}
                  >
                    <SearchIcon sx={{ color: "white", fontSize: "20px" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              '& .MuiOutlinedInput-root': {
                paddingRight: 0,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Select
            value={test}
            onChange={(e) => setTest(e.target.value)}
            fullWidth
            displayEmpty
            size="small"
          >
            <MenuItem value=""><Typography>Bài kiểm tra</Typography></MenuItem>
            <MenuItem value="Quiz 1">Quiz 1</MenuItem>
            <MenuItem value="Quiz 2">Quiz 2</MenuItem>
            <MenuItem value="Giữa kỳ">Giữa kỳ</MenuItem>
            <MenuItem value="Cuối kỳ">Cuối kỳ</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <Button
            variant="contained"
            onClick={handleOpenDialog1}
            fullWidth
            sx={{
              backgroundColor: '#8E24AA',
              color: 'white', 
              '&:hover': {
                backgroundColor: '#7B1FA2',
              },
            }}
          >
            Thiết lập ngưỡng
          </Button>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#1976D2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#303F9F',
              },
            }}
          >
            Phân tích
          </Button>
        </Grid>
      </Grid>
      <Box
          sx={{
            borderBottom: "1.2px solid #ccc", 
            marginY: 3, 
          }}
        />
      {/* Bảng dữ liệu */}
      <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "100%" }}>
      <Table sx={{ width: "100%", fontSize: "16px", '& td, & th': { textAlign: 'center', fontSize: '16px' } }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>MSSV</strong></TableCell>
              <TableCell><strong>Tên</strong></TableCell>
              <TableCell><strong>Điểm</strong></TableCell>
              <TableCell><strong>Thời gian làm</strong></TableCell>
              <TableCell><strong>Độ lệch</strong></TableCell>
              <TableCell><strong>Lý do</strong></TableCell>
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

      {/* Dialogs */}
      {/* Dialog 1: Thông báo chưa thiết lập ngưỡng */}
      <Dialog open={openDialog1} onClose={handleCloseDialog1} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          NGƯỠNG CHƯA ĐƯỢC THIẾT LẬP
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 3 }}>
          <NotificationsIcon sx={{ fontSize: 60, color: "#1976D2" }} />
          <Typography sx={{ mt: 2, color: "gray" }}>
            Bạn chưa thiết lập ngưỡng. Thiết lập ngưỡng của bạn hoặc tiếp tục với ngưỡng mặc định để tiếp tục phân tích.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" onClick={handleCloseDialog1}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#8E24AA", color: "white" }} onClick={handleOpenDialog3}>
            THIẾT LẬP
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#1976D2", color: "white" }} onClick={handleOpenDialog2}>
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
          <Button variant="contained" sx={{ bgcolor: "#1976D2", color: "white", width: "120px" }} onClick={handleCloseDialog2}>
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
          {/* Các trường ngưỡng */}
          <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2 }}>1. Ngưỡng tối thiểu / tối đa:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Min Time (mm:ss)" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Max Time (mm:ss)" variant="outlined" size="small" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" color="primary" sx={{ width: "120px" }} onClick={handleCloseDialog3}>
            HỦY
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#1976D2", color: "white", width: "120px" }} onClick={handleCloseDialog3}>
            LƯU
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FraudDetection;
