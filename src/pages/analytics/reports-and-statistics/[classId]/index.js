import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { ActionButton, BodyWrapper, Container, Header, InformationItem, InformationWrapper } from '@/components/Analytics/Styles/Styles';
import { TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import AnalyticsTable from '@/components/Analytics/Table/Table';

const StudentsList = () => {
  const router = useRouter();
  const { classId, pathname } = router.query;
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('identificationCode');
  const [buttonVariant, setButtonVariant] = useState('contained');
  const [buttonContent, setButtonContent] = useState('chi tiết');
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (buttonVariant === 'contained') {
      setRows([
        { id: 1, identificationCode: '21127001', fullName: "Nguyễn Văn A", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 2, identificationCode: "21127002", fullName: "Hoàng Văn B", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 3, identificationCode: "21127003", fullName: "Trần Văn C", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 4, identificationCode: "21127004", fullName: "Nguyễn Văn D", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 5, identificationCode: "21127005", fullName: "Lê Văn A", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 6, identificationCode: "21127006", fullName: "Trần Văn E", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 7, identificationCode: "21127007", fullName: "Nguyễn Văn F", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 8, identificationCode: "21127008", fullName: "Nguyễn Văn G", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 9, identificationCode: "21127009", fullName: "Trần Thị H", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 10, identificationCode: "21127010", fullName: "Hoàng Văn A", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 11, identificationCode: "21127011", fullName: "Nguyễn Văn A", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
        { id: 12, identificationCode: "21127012", fullName: "Nguyễn Văn A", major: "Hệ thống thông tin", faculty: "Công nghệ thông tin", program: "Chất lượng cao" },
      ]);
      setColumns([
        { id: "identificationCode", label: "MSSV", align: "left" },
        { id: "fullName", label: "Họ và tên", align: "left" },
        { id: "major", label: "Chuyên ngành", align: "left" },
        { id: "faculty", label: "Khoa", align: "left" },
        { id: "program", label: "Hệ đào tạo", align: "left" },
      ]);
      return;
    }
    setRows([
      { id: 1, identificationCode: '21127001', fullName: 'Nguyễn Văn A', midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 2, identificationCode: "21127002", fullName: "Hoàng Văn B", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 3, identificationCode: "21127003", fullName: "Trần Văn C", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 4, identificationCode: "21127004", fullName: "Nguyễn Văn D", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 5, identificationCode: "21127005", fullName: "Lê Văn A", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 6, identificationCode: "21127006", fullName: "Trần Văn E", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 7, identificationCode: "21127007", fullName: "Nguyễn Văn F", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 8, identificationCode: "21127008", fullName: "Nguyễn Văn G", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 9, identificationCode: "21127009", fullName: "Trần Thị H", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 10, identificationCode: "21127010", fullName: "Hoàng Văn A", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 11, identificationCode: "21127011", fullName: "Nguyễn Văn A", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
      { id: 12, identificationCode: "21127012", fullName: "Nguyễn Văn A", midtermGrade: '10', finalGrade: '10', projectGrade: '10', practiceGrade: '10', totalGrade: '10', classification: 'Xuất sắc' },
    ]);
    setColumns([
      { id: "identificationCode", label: 'MSSV' },
      { id: "fullName", label: 'Họ và tên' },
      { id: "midtermGrade", label: "Giữa kỳ" },
      { id: "finalGrade", label: "Cuối kỳ" },
      { id: "projectGrade", label: "Đồ án" },
      { id: "practiceGrade", label: "Thực hành" },
      { id: "totalGrade", label: "Tổng kết" },
      { id: "classification", label: "Xếp loại" },
    ]);
  }, [buttonVariant]);

  useEffect(() => {
    if (classId) console.log(classId);
  }, [classId]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleViewClass = (studentId) => {
    router.push(`/analytics/reports-and-statistics/${classId}/${btoa(studentId)}`);
  };

  useEffect(() => {
    console.log(classId, atob(classId));
  }, [classId]);

  const filteredRows = rows.filter((row) => {
    return (
      row.fullName.toLowerCase().includes(search.toLowerCase()) ||
      row.identificationCode.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  }

  const sortedRows = filteredRows.sort((a, b) => {
    if (sortOption === 'identificationCode') {
      return a.identificationCode.localeCompare(b.identificationCode);
    }
    return a.fullName.localeCompare(b.fullName);
  });

  const handleViewDetail = () => {
    if (buttonVariant === 'contained') {
      setButtonContent('tổng quan');
      setButtonVariant('outlined');
      return;
    }
    setButtonContent('chi tiết');
    setButtonVariant('contained');
  };

  const handleClickAnalytics = () => {
    router.push(`/analytics/reports-and-statistics/${classId}/charts`);
  }

  return (
    <Container>
      <Header>
        {/* Filter for Sorting */}
        <FormControl style={{ width: '20%' }}>
          <InputLabel>Sắp xếp</InputLabel>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            label="Sắp xếp"
          >
            <MenuItem value="identificationCode">MSSV</MenuItem>
            <MenuItem value="fullName">Họ và Tên</MenuItem>
          </Select>
        </FormControl>
        {/* Search */}
        <TextField
          variant='outlined'
          label='Tìm kiếm'
          value={search}
          onChange={handleSearchChange}
          style={{ width: '50%' }}
        />
        <ActionButton
          variant='contained'
          style={{ width: '10%', fontWeight: "700", fontSize: "14px" }}
        >
          Tìm kiếm
        </ActionButton>
        <ActionButton
          variant={buttonVariant}
          style={{ width: '10%', fontWeight: "700", fontSize: "14px" }}
          onClick={handleViewDetail}
          $variant={buttonVariant}
        >
          {buttonContent}
        </ActionButton>
        <ActionButton
          variant='contained'
          style={{ width: '10%', fontWeight: "700", fontSize: "14px" }}
          onClick={handleClickAnalytics}
        >
          Thống kê
        </ActionButton>
      </Header>
      <BodyWrapper>
        <InformationWrapper>
          <InformationItem>Số lượng sinh viên: {0}</InformationItem>
          <InformationItem>Điểm trung bình: {0}</InformationItem>
        </InformationWrapper>
        <AnalyticsTable
          filteredRows={sortedRows}
          columns={columns}
          handleActions={handleViewClass}
          action={false} />
      </BodyWrapper>
    </Container>
  )

};

export default StudentsList; 