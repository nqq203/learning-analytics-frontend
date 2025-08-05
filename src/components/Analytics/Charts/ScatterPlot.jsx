import React, { useState, useMemo } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const labelMap = {
  midtermGrade: "Điểm giữa kỳ",
  finalGrade: "Điểm cuối kỳ",
  projectGrade: "Điểm đồ án",
  practiceGrade: "Điểm thực hành",
  totalGrade: "Điểm tổng",
};

const ScatterChartAnalytics = ({ data, selectedGrades }) => {
  const [xField, setXField] = useState(selectedGrades[0] || "");
  const [yField, setYField] = useState(selectedGrades[1] || "");

  const scatterData = useMemo(() => {
    if (!xField || !yField) return [];

    return data.map((item) => ({
      x: parseFloat(item[xField]),
      y: parseFloat(item[yField]),
      identificationCode: item.identificationCode,
      fullName: item.fullName,
    }));
  }, [data, xField, yField]);

  return (
    <Box boxShadow={3} p={2} display="flex" flexDirection="column" alignItems="center" gap="20px">
      <h3 style={{ margin: 0 }}>(ScatterPlot) Biểu đồ phân tán tính tương quan điểm số</h3>

      <ScatterChart
        width={600}
        height={500}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          name={labelMap[xField] || xField}
          type="number"
          domain={["dataMin", "dataMax"]}
        />
        <YAxis
          dataKey="y"
          name={labelMap[yField] || yField}
          type="number"
          domain={["dataMin", "dataMax"]}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name) => {
            // Đổi tên x, y thành label gốc
            if (name === "x") return [value, labelMap[xField] || xField];
            if (name === "y") return [value, labelMap[yField] || yField];
            return [value, name];
          }}
          // Label của mỗi điểm - hiển thị tên/mã sinh viên
          labelFormatter={(label, payload) => {
            if (payload && payload.length > 0) {
              const { fullName, identificationCode } = payload[0].payload;
              return `${fullName} - ${identificationCode}`;
            }
            return label;
          }}
        />
        <Legend />
        <Scatter
          name="Sinh viên"
          data={scatterData}
          fill="#1976d2"
        />
      </ScatterChart>
      <Box display="flex" flexDirection="row" gap="20px" >
        {/* Chọn trường cho trục X */}
        <FormControl size="small" style={{ width: 200 }}>
          <InputLabel id="x-field-label">Trục X</InputLabel>
          <Select
            labelId="x-field-label"
            value={xField}
            label="Trục X"
            onChange={(e) => setXField(e.target.value)}
          >
            {selectedGrades.map((gradeKey) => (
              <MenuItem key={gradeKey} value={gradeKey}>
                {labelMap[gradeKey] || gradeKey}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Chọn trường cho trục Y */}
        <FormControl size="small" style={{ width: 200 }}>
          <InputLabel id="y-field-label">Trục Y</InputLabel>
          <Select
            labelId="y-field-label"
            value={yField}
            label="Trục Y"
            onChange={(e) => setYField(e.target.value)}
          >
            {selectedGrades.map((gradeKey) => (
              <MenuItem key={gradeKey} value={gradeKey}>
                {labelMap[gradeKey] || gradeKey}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default ScatterChartAnalytics;