import React, { useState, useMemo, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mapping tên trường điểm sang label tiếng Việt
const labelMap = {
  midtermGrade: "Điểm giữa kỳ",
  finalGrade: "Điểm cuối kỳ",
  projectGrade: "Điểm đồ án",
  practiceGrade: "Điểm thực hành",
  totalGrade: "Điểm tổng",
};

const HistogramChartAnalytics = ({ 
  data = [], 
  selectedGrades = [], 
  isLOChart = false,
  loCode = "",
  loData = null
}) => {
  // Handle LO Chart data differently
  if (isLOChart && loData) {
    // Kiểm tra cấu trúc dữ liệu
    if (!Array.isArray(loData)) {
      return (
        <Box p={2} textAlign="center" sx={{ backgroundColor: '#fff3cd', borderRadius: 1 }}>
          <p>Dữ liệu histogram không đúng định dạng</p>
          <small>Mong đợi: Array, nhận được: {typeof loData}</small>
        </Box>
      );
    }

    // Nếu là array số thô, chuyển đổi thành format phù hợp
    let processedData = loData;
    
    if (loData.length > 0 && typeof loData[0] === 'number') {
      // Chuyển đổi array số thành histogram data
      const ranges = [
        { min: 0, max: 4, range: "0-4" },
        { min: 4, max: 6, range: "4-6" },
        { min: 6, max: 8, range: "6-8" },
        { min: 8, max: 10, range: "8-10" }
      ];
      
      processedData = ranges.map(range => ({
        range: range.range,
        count: loData.filter(score => 
          score >= range.min && (score < range.max || (range.max === 10 && score === 10))
        ).length
      }));
    }

    // Validate final data structure
    const hasValidStructure = processedData.every(item => 
      item && typeof item === 'object' && 
      (typeof item.range === 'string' || typeof item.label === 'string') && 
      typeof item.count === 'number'
    );

    if (!hasValidStructure) {
      return (
        <Box p={2} textAlign="center" sx={{ backgroundColor: '#fff3cd', borderRadius: 1 }}>
          <p>Cấu trúc dữ liệu không hợp lệ</p>
          <small>Cần: {`[{range: string, count: number}]`}</small>
          <br />
          <small>Nhận được: {JSON.stringify(processedData?.slice(0, 2))}</small>
        </Box>
      );
    }

    // Ensure consistent property names
    const chartData = processedData.map(item => ({
      range: item.range || item.label,
      count: item.count
    }));

    return (
      <Box
        boxShadow={3}
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        sx={{ width: '100%' }}
      >
        <h3 style={{ margin: 0, fontSize: '16px' }}>
          Phân bố điểm - {loCode}
        </h3>
        
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1976d2" name="Số sinh viên" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  }

  // For regular charts, ensure we have valid data
  if (!data || !Array.isArray(data) || !selectedGrades || !Array.isArray(selectedGrades) || selectedGrades.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <p>Vui lòng chọn loại điểm để hiển thị histogram</p>
      </Box>
    );
  }

  // Chọn loại điểm muốn hiển thị histogram, mặc định là phần tử đầu tiên trong selectedGrades
  const [selectedGradeField, setSelectedGradeField] = useState(selectedGrades[0] || "");

  // Tính toán phân bố số lượng sinh viên theo các khoảng điểm: 0-4, 4-6, 6-8, 8-10
  const distributionData = useMemo(() => {
    if (!selectedGradeField || !data || !Array.isArray(data)) return [];

    const ranges = [
      { min: 0, max: 4, label: "0-4", count: 0 },
      { min: 4, max: 6, label: "4-6", count: 0 },
      { min: 6, max: 8, label: "6-8", count: 0 },
      { min: 8, max: 10, label: "8-10", count: 0 },
    ];

    data.forEach((item) => {
      const score = parseFloat(item[selectedGradeField]);
      if (!isNaN(score)) {
        ranges.forEach((range) => {
          // Nếu score nằm trong khoảng [min, max) và nếu max là 10 thì bao gồm cả điểm 10
          if (score >= range.min && (score < range.max || (range.max === 10 && score === 10))) {
            range.count++;
          }
        });
      }
    });
    return ranges;
  }, [data, selectedGradeField]);

  return (
    <Box
      boxShadow={3}
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="20px"
      sx={{ width: '100%' }}
    >
      <h3 style={{ margin: 0 }}>(Histogram) Biểu đồ phân phối điểm</h3>

      {/* Biểu đồ Bar hiển thị phân bố số lượng sinh viên theo các khoảng điểm */}
      <Box sx={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={distributionData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              label={{ value: "Khoảng điểm", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{ value: "Số lượng sinh viên", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"       // "top", "middle", "bottom"
              align="center"            // "left", "center", "right"
              wrapperStyle={{ top: 0 }} // Tinh chỉnh vị trí
            />
            <Bar dataKey="count" fill="#82ca9d" name="Số sinh viên" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Dropdown chọn loại điểm để hiển thị phân bố */}
      <FormControl size="small" style={{ width: 200 }}>
        <InputLabel id="histogram-grade-field-label">Chọn loại điểm</InputLabel>
        <Select
          labelId="histogram-grade-field-label"
          value={selectedGradeField}
          label="Chọn loại điểm"
          onChange={(e) => setSelectedGradeField(e.target.value)}
        >
          {selectedGrades.map((gradeKey) => (
            <MenuItem key={gradeKey} value={gradeKey}>
              {labelMap[gradeKey] || gradeKey}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default HistogramChartAnalytics;
