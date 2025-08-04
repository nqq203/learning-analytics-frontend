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
  loData = null,
  loType = ""
}) => {
  // console.log('🔍 Histogram Debug:', { isLOChart, loCode, loType, loData });

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
    let ranges = [];
    let isPercentage = loType === 'finalExam';

    if (loData.length > 0 && typeof loData[0] === 'number') {
      // Chuyển đổi array số thành histogram data
      if (loType === 'finalExam') {
        // For Final Exam: percentage ranges (0-100%)
        ranges = [
          { min: 0, max: 25, range: "0-25%", label: "Yếu" },
          { min: 25, max: 50, range: "25-50%", label: "Trung bình yếu" },
          { min: 50, max: 75, range: "50-75%", label: "Trung bình" },
          { min: 75, max: 100, range: "75-100%", label: "Tốt" }
        ];
      } else {
        // For Assignment/Quiz: score ranges (0-10)
        ranges = [
          { min: 0, max: 4, range: "0-4", label: "Yếu" },
          { min: 4, max: 6, range: "4-6", label: "Trung bình" },
          { min: 6, max: 8, range: "6-8", label: "Khá" },
          { min: 8, max: 10, range: "8-10", label: "Tốt" }
        ];
      }

      processedData = ranges.map(range => ({
        range: range.range,
        label: range.label,
        count: loData.filter(score => {
          const numScore = parseFloat(score);
          return numScore >= range.min && (numScore < range.max ||
            ((loType === 'finalExam' ? range.max === 100 : range.max === 10) && numScore >= range.min));
        }).length
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
      count: item.count,
      label: item.label || item.range
    }));

    // Get appropriate colors and titles
    const getChartTitle = () => {
      if (loType === 'finalExam') {
        return `📊 Phân bố tỷ lệ hoàn thành - ${loCode}`;
      }
      return `📊 Phân bố điểm - ${loCode}`;
    };

    const getXAxisLabel = () => {
      return loType === 'finalExam' ? "Khoảng tỷ lệ hoàn thành (%)" : "Khoảng điểm";
    };

    const getBarColor = () => {
      return loType === 'finalExam' ? "#82ca9d" : "#1976d2";
    };

    return (
      <Box
        boxShadow={2}
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        sx={{ width: '100%', height: '100%' }}
      >
        <h3 style={{
          margin: 0,
          fontSize: '16px',
          color: "black",
        }}>
          {getChartTitle()}
        </h3>

        {/* Debug Info */}
        <Box sx={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>
          <div>📊 Loại: {loType} | Thang đo: {isPercentage ? '0-100%' : '0-10'} | Tổng: {loData.length} sinh viên</div>
        </Box>

        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" heig>
            <BarChart
              data={chartData}
              margin={{ top: 40, right: 30, left: 20, bottom: 60 }}  // tăng bottom để nhãn X đủ chỗ
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="range"
                label={{
                  value: getXAxisLabel(),
                  position: "insideBottom",
                  offset: -15         // đẩy nhãn xuống thấp hơn
                }}
              />
              <YAxis
                label={{ value: "Số lượng sinh viên", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  loType === 'finalExam' ? 'Số sinh viên đạt' : 'Số sinh viên'
                ]}
                labelFormatter={(label) => {
                  const item = chartData.find(d => d.range === label);
                  return `${label} (${item?.label || ''})`;
                }}
              />
              <Legend
                verticalAlign="top"      // đưa legend lên trên chart
                align="center"
                wrapperStyle={{ top: 0, marginBottom: 20 }}
              />
              <Bar
                dataKey="count"
                fill={getBarColor()}
                name="Số sinh viên"
              />
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
      sx={{
        width: '100%',
        overflow: 'visible'      // đảm bảo summary không bị cắt
      }}
    >
      <h3 style={{ margin: 0 }}>(Histogram) Biểu đồ phân phối điểm</h3>

      {/* Biểu đồ Bar hiển thị phân bố số lượng sinh viên theo các khoảng điểm */}
      <Box sx={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={distributionData}
            margin={{ top: 40, right: 30, left: 20, bottom: 60 }} // match với LO
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="label"           // nếu bạn thống nhất dùng "range" ở LO, có thể đổi distributedData.map -> field "range" luôn
              label={{
                value: "Khoảng điểm",
                position: "insideBottom",
                offset: -15
              }}
            />
            <YAxis
              label={{ value: "Số lượng sinh viên", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{ top: 0, marginBottom: 20 }}
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