import React, { useState, useMemo } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mapping tên trường điểm sang label tiếng Việt
const labelMap = {
  midtermGrade: "Điểm giữa kỳ",
  finalGrade: "Điểm cuối kỳ",
  projectGrade: "Điểm đồ án",
  practiceGrade: "Điểm thực hành",
  totalGrade: "Điểm tổng",
};

const HistogramChartAnalytics = ({ data, selectedGrades }) => {
  // Chọn loại điểm muốn hiển thị histogram, mặc định là phần tử đầu tiên trong selectedGrades
  const [selectedGradeField, setSelectedGradeField] = useState(selectedGrades[0] || "");

  // Tính toán phân bố số lượng sinh viên theo các khoảng điểm: 0-4, 4-6, 6-8, 8-10
  const distributionData = useMemo(() => {
    if (!selectedGradeField) return [];

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
    >
      <h3 style={{ margin: 0 }}>(Histogram) Biểu đồ phân phối điểm</h3>

      {/* Biểu đồ Bar hiển thị phân bố số lượng sinh viên theo các khoảng điểm */}
      <BarChart
        width={600}
        height={500}
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
