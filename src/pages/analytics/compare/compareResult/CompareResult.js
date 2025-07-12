import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  Box,
  Link,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScoreComparisonCharts from "@/components/CompareResults/charts/ScoreComparisonCharts";

const CompareResult = ({
  data,
  mode, 
  onBack,
  criteria,
  course,
  selectedItems,
  loading,
}) => {
  const [chartType, setChartType] = useState("bar");
  
if (loading) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: 3,
        p: 4
      }}
    >
      <CircularProgress 
        size={60} 
        sx={{ color: '#1e3a8a', mb: 2 }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#64748b',
          fontWeight: 500 
        }}
      >
        Đang tải dữ liệu so sánh...
      </Typography>
    </Box>
  );
}

if (!loading && !data) {
  return (
    <Card sx={{ 
      mt: 4, 
      maxWidth: 800, 
      mx: "auto",
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      border: '1px solid #e2e8f0',
      borderRadius: 3
    }}>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#64748b',
            mb: 2 
          }}
        >
          Không có dữ liệu để hiển thị
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={onBack}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            color: "#1e3a8a",
            textDecoration: "none",
            fontWeight: 500,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          <ArrowBackIcon fontSize="small" />
          Quay lại
        </Link>
      </CardContent>
    </Card>
  );
}

  const handleChangeTab = (event, newValue) => {
    setChartType(newValue);
  };

  const safeData = data || {};
  const sanitizedData = Object.values(safeData).map((item) => ({
    ...item,
    midtermAvg: Number(item.midtermAvg) || 0,
    practiceAvg: Number(item.practiceAvg) || 0,
    projectAvg: Number(item.projectAvg) || 0,
    finalAvg: Number(item.finalAvg) || 0,
    totalAvg: Number(item.totalAvg) || 0,
    totalStudents: Number(item.totalStudents) || 0,
  }));
  const chartData = sanitizedData.map((item) => ({
    name: item.className || "N/A",
    midterm: item.midtermAvg,
    practice: item.practiceAvg,
    project: item.projectAvg,
    final: item.finalAvg,
    total: item.totalAvg,
  }));

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    }}>
      <Card sx={{ 
        maxWidth: 1400, 
        mx: "auto", 
        borderRadius: 3, 
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <CardContent sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
            color: 'white',
            p: 3,
            position: 'relative'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Link
                component="button"
                variant="body2"
                onClick={onBack}
                sx={{ 
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Quay lại
              </Link>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 700,
                  textAlign: "center",
                  flexGrow: 1 
                }}
              >
                Kết quả so sánh
              </Typography>
              <Box width="64px" />
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {/* Bảng dữ liệu */}
            <Paper sx={{ 
              mb: 4,
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              overflow: 'hidden'
            }}>
              <TableContainer>
                <Table size="small" aria-label="comparison table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f1f5f9' }}>
                      <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>
                        {mode === "class" ? "Tên lớp" : "Khóa"}
                      </TableCell>
                      {mode === "class" && (
                        <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>
                          Tên môn học
                        </TableCell>
                      )}
                      <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>Giữa kỳ</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>Thực hành</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>Đồ án</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>Cuối kỳ</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>Trung bình</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: '#1e3a8a' }}>Số SV</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sanitizedData.map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          bgcolor: index % 2 === 0 ? "#f8fafc" : "white",
                          "&:hover": { 
                            bgcolor: "#e0f2fe",
                            transform: "scale(1.01)",
                            transition: "all 0.2s ease-in-out"
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                          {mode === "class"
                            ? item.className || "N/A"
                            : item.className?.match(/K\d+/)?.[0] || "N/A"}
                        </TableCell>
                        {mode === "class" && (
                          <TableCell sx={{ color: '#64748b' }}>
                            {item.courseName || "N/A"}
                          </TableCell>
                        )}
                        <TableCell sx={{ fontWeight: 500 }}>{item.midtermAvg.toFixed(2)}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{item.practiceAvg.toFixed(2)}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{item.projectAvg.toFixed(2)}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>{item.finalAvg.toFixed(2)}</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#059669' }}>
                          {item.totalAvg.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500, color: '#dc2626' }}>
                          {item.totalStudents}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* Biểu đồ */}
            <Paper sx={{ 
              border: '1px solid #e2e8f0',
              borderRadius: 2,
              overflow: 'hidden'
            }}>
              <Box sx={{ p: 2 }}>
                <Tabs
                  value={chartType}
                  onChange={handleChangeTab}
                  centered
                  indicatorColor="primary"
                  textColor="primary"
                  sx={{
                    '& .MuiTab-root': {
                      fontWeight: 600,
                      color: '#64748b',
                      '&.Mui-selected': {
                        color: '#1e3a8a',
                      },
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#1e3a8a',
                    },
                  }}
                >
                  <Tab label="Biểu đồ Cột" value="bar" />
                  <Tab label="Biểu đồ Radar" value="radar" />
                  <Tab label="Biểu đồ Tròn" value="pie" />
                </Tabs>

                <Box sx={{ mt: 3, minHeight: '400px' }}>
                  <ScoreComparisonCharts
                    chartType={chartType}
                    data={chartData}
                    getDisplayName={(item) => item.name}
                    getClassColor={(index) => {
                      const colors = ["#1e3a8a", "#059669", "#dc2626", "#f59e0b", "#8b5cf6"];
                      return colors[index % colors.length];
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompareResult;
