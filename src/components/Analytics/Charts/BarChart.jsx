import React, { useState, useEffect, useMemo } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  BarChart,
  Bar,
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

const BarChartAnalytics = ({ data, selectedGrades }) => {
  const gradeFields = useMemo(() => {
    return selectedGrades.map((field) => ({
      key: field,
      label: labelMap[field] || field,
    }));
  }, [selectedGrades]);

  const [selectedBarFields, setSelectedBarFields] = useState([
    selectedGrades[0],
  ]);
  const [barData, setBarData] = useState([]);

  const colorMap = {
    midtermGrade: "#8884d8",
    finalGrade: "#82ca9d",
    projectGrade: "#ffc658",
    practiceGrade: "#d0ed57",
    totalGrade: "#a4de6c",
  };

  // Các khoảng điểm
  const scoreRanges = [
    { label: "0–4", min: 0, max: 4 },
    { label: "4–6", min: 4, max: 6 },
    { label: "6–8", min: 6, max: 8 },
    { label: "8–10", min: 8, max: 10.0001 }, 
  ];

  function convertDataForBarChart(data, selectedFields) {
    const result = scoreRanges.map((range) => {
      const row = { range: range.label };
      selectedFields.forEach((field) => {
        const count = data.filter((item) => {
          const value = parseFloat(item[field]);
          return !isNaN(value) && value >= range.min && value < range.max;
        }).length;
        row[field] = count;
      });
      return row;
    });

    return result;
  }

  useEffect(() => {
    const converted = convertDataForBarChart(data, selectedBarFields);
    setBarData(converted);
  }, [data, selectedBarFields]);

  // Xử lý thay đổi cho dropdown chọn loại điểm
  const handleFieldChange = (e) => {
    const { value } = e.target;
    setSelectedBarFields(value);
  };

  // Xử lý thay đổi cho dropdown chọn khóa
  const handleAcademicYearChange = (e) => {
    const { value } = e.target;
    // Nếu value là chuỗi thì chuyển thành mảng, ngược lại lấy nguyên mảng
    setSelectedAcademicYears(
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Box
      boxShadow={3}
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="20px"
    >
      <h3 style={{ margin: 0 }}>
        (Biểu đồ cột) So sánh số lượng sinh viên theo khoảng điểm
      </h3>

      {/* Render BarChart */}
      <BarChart width={600} height={500} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range"  />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Với mỗi trường được chọn -> vẽ một Bar */}
        {selectedBarFields.map((fieldKey) => (
          <Bar
            key={fieldKey}
            dataKey={fieldKey}
            fill={colorMap[fieldKey] || "#8884d8"}
            name={
              gradeFields.find((f) => f.key === fieldKey)?.label || fieldKey
            }
          />
        ))}
      </BarChart>

      <Box display="flex" flexDirection="row" gap="20px">
        {/* Dropdown để chọn loại điểm (field) */}
        <FormControl size="small" style={{ width: 300 }}>
          <InputLabel id="bar-field-label">Chọn loại điểm</InputLabel>
          <Select
            labelId="bar-field-label"
            multiple
            value={selectedBarFields}
            onChange={handleFieldChange}
            label="Chọn loại điểm"
            renderValue={(selected) => {
              const labels = gradeFields
                .filter((f) => selected.includes(f.key))
                .map((f) => f.label);
              return labels.join(", ");
            }}
          >
            {gradeFields.map((field) => (
              <MenuItem key={field.key} value={field.key}>
                {field.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default BarChartAnalytics;
