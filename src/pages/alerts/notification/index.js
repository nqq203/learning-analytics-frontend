import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { ActionButton, BodyWrapper, Container, Header, InformationItem, InformationWrapper } from '@/components/Analytics/Styles/Styles';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import AlertsTable from '@/components/Analytics/Table/Table';

const Alerts = () => {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [classId, setClassId] = useState('');
  const [test, setTest] = useState('');
  const [warningCount, setWarningCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setRows([
      { id: 1, subjectCode: 'CS101', test: 'Giữa kỳ', identificationCode: '21127001', fullName: "Nguyễn Văn A", grade: '4' },
      { id: 2, subjectCode: "CS102", test: "Cuối kỳ", identificationCode: "21127002", fullName: "Hoàng Văn B", grade: '4.5' },
    ]);

    setColumns([
      { id: "subjectCode", label: "Mã môn học" },
      { id: "test", label: "Bài kiểm tra" },
      { id: "identificationCode", label: "MSSV" },
      { id: "fullName", label: "Họ và tên" },
      { id: "grade", label: "Điểm" },
    ]);
  }, []);

  // Hàm thay đổi giá trị môn học
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Hàm thay đổi giá trị lớp học
  const handleClassChange = (e) => {
    setClassId(e.target.value);
  };

  // Hàm thay đổi giá trị bài kiểm tra
  const handleTestChange = (e) => {
    setTest(e.target.value);
  };

  // Mở Dialog xác nhận
  const handleSendWarning = () => {
    setOpenDialog(true);
  };

  const handleConfirmWarning = () => {
    alert(`Đã gửi cảnh cáo!`);
    setWarningCount(warningCount + 1);
    setOpenDialog(false); 
  };

  const handleCancelWarning = () => {
    setOpenDialog(false);
  };

  const handleViewClass = (studentId) => {
    router.push(`/analytics/reports-and-statistics/${classId}/${btoa(studentId)}`);
  };

  return (
    <Container>
      <Header>
        <Grid container spacing={2} alignItems="center">
          {/* Box tìm kiếm theo Môn học */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Môn học</InputLabel>
              <Select
                value={subject}
                onChange={handleSubjectChange}
                label="Môn học"
              >
                <MenuItem value="CS101">Môn học 1</MenuItem>
                <MenuItem value="CS102">Môn học 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Box tìm kiếm theo Lớp */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>Lớp</InputLabel>
              <Select
                value={classId}
                onChange={handleClassChange}
                label="Lớp"
              >
                <MenuItem value="Lớp 1">Lớp 1</MenuItem>
                <MenuItem value="Lớp 2">Lớp 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Box tìm kiếm theo Bài kiểm tra */}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Bài kiểm tra</InputLabel>
              <Select
                value={test}
                onChange={handleTestChange}
                label="Bài kiểm tra"
              >
                <MenuItem value="Giữa kỳ">Giữa kỳ</MenuItem>
                <MenuItem value="Cuối kỳ">Cuối kỳ</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Box Số lần cảnh cáo */}
          <Grid item xs={2}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Số lần cảnh cáo"
                value={warningCount}
                disabled
              />
            </FormControl>
          </Grid>

          {/* Button Gửi cảnh cáo */}
          <Grid item xs={1}>
            <ActionButton
              variant="contained"
              style={{
                fontWeight: "700",
                fontSize: "11px",
                backgroundColor: "#1976d2", 
                padding: "10px 20px", 
                borderRadius: "8px", 
                textTransform: "none", 
              }}
              onClick={handleSendWarning}
            >
              Gửi cảnh cáo
            </ActionButton>
          </Grid>
        </Grid>
      </Header>

      <BodyWrapper>
        <InformationWrapper>
          {/* Hiển thị bảng dữ liệu sinh viên */}
          <Grid container>
            <Grid item xs={12}>
              <AlertsTable
                filteredRows={rows}
                columns={columns}
                handleActions={handleViewClass}
                action={false}
              />
            </Grid>
          </Grid>
        </InformationWrapper>
      </BodyWrapper>

      {/* Dialog xác nhận gửi cảnh cáo */}
      <Dialog
        open={openDialog}
        onClose={handleCancelWarning}
        PaperProps={{
          style: {
            borderRadius: '16px',
            backgroundColor: '#f4f6f8', 
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
          },
        }}
        TransitionProps={{
          onEnter: () => {},
        }}
      >
        <DialogTitle style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
          Tiếp tục gửi thông báo cảnh cáo đến sinh viên?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCancelWarning}
            style={{
              backgroundColor: '#ccc',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '6px 12px',
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmWarning}
            style={{
              backgroundColor: '#1976d2',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
              padding: '6px 12px',
            }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Alerts;