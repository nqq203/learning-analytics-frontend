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
} from "@mui/material";
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
      <Card sx={{ mt: 4, maxWidth: 800, mx: "auto", py: 5, textAlign: "center" }}>
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2 }}>Đang tải dữ liệu...</Typography>
      </Card>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Card sx={{ mt: 4, maxWidth: 800, mx: "auto" }}>
        <CardContent>
          <Typography>Không có dữ liệu để hiển thị.</Typography>
          <Link
            component="button"
            variant="body2"
            onClick={onBack}
            sx={{
              mt: 2,
              display: "inline-block",
              color: "#1976d2",
              textDecoration: "underline",
            }}
          >
            Quay lại
          </Link>
        </CardContent>
      </Card>
    );
  }

  const handleChangeTab = (event, newValue) => {
    setChartType(newValue);
  };

  const sanitizedData = Object.values(data).map((item) => ({
    ...item,
    midtermAvg: Number(item.midtermAvg) || 0,
    practiceAvg: Number(item.practiceAvg) || 0,
    projectAvg: Number(item.projectAvg) || 0,
    finalAvg: Number(item.finalAvg) || 0,
    totalAvg: Number(item.totalAvg) || 0,
    totalStudents: Number(item.totalStudents) || 0,
  }));

  return (
    <Card
      sx={{ mt: 4, maxWidth: 1400, mx: "auto", borderRadius: 3, boxShadow: 3 }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Link
            component="button"
            variant="body2"
            onClick={onBack}
            sx={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Quay lại
          </Link>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Kết quả so sánh
          </Typography>
          <Box width="64px" />
        </Box>

        <Typography variant="body1">
          <strong>Tiêu chí: </strong>
          {criteria === "class" ? "Theo Lớp" : "Theo Khóa"}
        </Typography>
        <Typography variant="body1">
          <strong>Môn học: </strong>
          {course || "Tất cả"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>
            {criteria === "class" ? "Lớp đã chọn" : "Khóa đã chọn"}:{" "}
          </strong>
          {selectedItems?.length ? selectedItems.join(", ") : "Không có"}
        </Typography>

        {/* Table */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size="small" aria-label="comparison table">
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.light" }}>
                <TableCell>
                  <strong>{mode === "class" ? "Tên lớp" : "Khóa"}</strong>
                </TableCell>
                {mode === "class" && (
                  <TableCell>
                    <strong>Tên môn học</strong>
                  </TableCell>
                )}
                <TableCell>
                  <strong>Điểm giữa kỳ</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm thực hành</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm đồ án</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm cuối kỳ</strong>
                </TableCell>
                <TableCell>
                  <strong>Điểm trung bình</strong>
                </TableCell>
                <TableCell>
                  <strong>Số lượng SV</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sanitizedData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    bgcolor: index % 2 === 0 ? "grey.100" : "common.white",
                    "&:hover": { bgcolor: "#e3f2fd" },
                  }}
                >
                  <TableCell>
                    {mode === "class"
                      ? item.className || "N/A"
                      : item.className?.match(/K\d+/)?.[0] || "N/A"}
                  </TableCell>
                  {mode === "class" && (
                    <TableCell>{item.courseName || "N/A"}</TableCell>
                  )}
                  <TableCell>{item.midtermAvg}</TableCell>
                  <TableCell>{item.practiceAvg}</TableCell>
                  <TableCell>{item.projectAvg}</TableCell>
                  <TableCell>{item.finalAvg}</TableCell>
                  <TableCell>{item.totalAvg}</TableCell>
                  <TableCell>{item.totalStudents}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Charts */}
        <Box sx={{ width: "100%", mt: 4 }}>
          <Tabs
            value={chartType}
            onChange={handleChangeTab}
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Biểu đồ Cột" value="bar" />
            <Tab label="Biểu đồ Radar" value="radar" />
            <Tab label="Biểu đồ Tròn" value="pie" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            <ScoreComparisonCharts
              chartType={chartType}
              data={sanitizedData}
              getDisplayName={(item) => item.className}
              getClassColor={(index) => {
                const colors = [
                  "#8884d8",
                  "#82ca9d",
                  "#ffc658",
                  "#ff8042",
                  "#8dd1e1",
                ];
                return colors[index % colors.length];
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompareResult;
