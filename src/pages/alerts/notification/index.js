import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import {
  ActionButton,
  BodyWrapper,
  Container,
  Header,
  InformationWrapper,
} from '@/components/Analytics/Styles/Styles';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from '@mui/material';
import AlertsTable from '@/components/Analytics/Table/Table';
import { Divider } from '@mui/material';

const Alerts = () => {
  const router = useRouter();

  // State
  const [subject, setSubject] = useState('');
  const [classId, setClassId] = useState('');
  const [testType, setTestType] = useState('');
  const [warningCount, setWarningCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  // Fake data
  useEffect(() => {
    setRows([
      { id: 1, subjectCode: 'CS101', test: 'Giữa kỳ', identificationCode: '21127001', fullName: 'Nguyễn Văn A', grade: '4' },
      { id: 2, subjectCode: 'CS102', test: 'Cuối kỳ', identificationCode: '21127002', fullName: 'Hoàng Văn B', grade: '4.5' },
    ]);

    setColumns([
      { id: 'subjectCode', label: 'Mã môn học' },
      { id: 'test', label: 'Bài kiểm tra' },
      { id: 'identificationCode', label: 'MSSV' },
      { id: 'fullName', label: 'Họ và tên' },
      { id: 'grade', label: 'Điểm' },
    ]);
  }, []);

  // Handlers
  const handleSendWarning = () => setOpenDialog(true);
  const handleConfirmWarning = () => {
    alert('Đã gửi cảnh cáo!');
    setWarningCount(prev => prev + 1);
    setOpenDialog(false);
  };
  const handleCancelWarning = () => setOpenDialog(false);
  const handleViewClass = (studentId) => {
    router.push(`/analytics/reports-and-statistics/${classId}/${btoa(studentId)}`);
  };

  return (
    <Container>
      {/* Header section */}
      <Header>
        <Grid container spacing={1} sx={{ padding: '1vh 1vw' }}>
          <Grid item xs={6} sm={3} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Môn học</InputLabel>
              <Select value={subject} onChange={(e) => setSubject(e.target.value)} label="Môn học">
                <MenuItem value="CS101">Môn học 1</MenuItem>
                <MenuItem value="CS102">Môn học 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Lớp</InputLabel>
              <Select value={classId} onChange={(e) => setClassId(e.target.value)} label="Lớp">
                <MenuItem value="Lớp 1">Lớp 1</MenuItem>
                <MenuItem value="Lớp 2">Lớp 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel>Bài kiểm tra</InputLabel>
              <Select value={testType} onChange={(e) => setTestType(e.target.value)} label="Bài kiểm tra">
                <MenuItem value="Giữa kỳ">Giữa kỳ</MenuItem>
                <MenuItem value="Cuối kỳ">Cuối kỳ</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3} md={2.5}>
            <TextField
              label="Số lần cảnh cáo"
              value={warningCount}
              disabled
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSendWarning}
              sx={{ height: '40px', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'none' }}
            >
              GỬI CẢNH BÁO
            </Button>
          </Grid>
        </Grid>
      </Header>

      {/* Body content */}
      <BodyWrapper>
        <InformationWrapper>
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

      {/* Warning confirmation dialog */}
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
      >
        <DialogTitle sx={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
          Tiếp tục gửi thông báo cảnh cáo đến sinh viên?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCancelWarning}
            sx={{
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
            sx={{
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
