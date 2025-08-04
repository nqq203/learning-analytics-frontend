import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const PieChartAnalytics = ({
  pieChartData,
  selectedGrades = [],
  selectedGradeField = "",
  setSelectedGradeField = () => { },
  isLOChart = false,
  loCode = ""
}) => {
  function formatFieldNameForFilter(field) {
    // Chèn dấu cách trước các chữ cái in hoa, sau đó viết hoa chữ cái đầu tiên
    // const result = field.replace(/([A-Z])/g, " $1").trim();
    // const name = result.charAt(0).toUpperCase() + result.slice(1);
    if (field === "totalGrade") {
      return "Điểm Tổng";
    } else if (field === "midtermGrade") {
      return "Điểm Giữa Kỳ";
    } else if (field === "finalGrade") {
      return "Điểm Cuối Kỳ";
    } else if (field === "projectGrade") {
      return "Điểm Đồ Án";
    } else if (field === "practiceGrade") {
      return "Điểm Thực Hành";
    }
  };

  const handleGradeFieldChange = (e) => {
    console.log(e.target.value);
    setSelectedGradeField(e.target.value);
  };

  if (!pieChartData) return null;

  // Mapping màu sắc đúng ý nghĩa
  const colorMap = {
    'Xuất Sắc': '#a259e6', // tím
    'Giỏi': '#3b82f6',    // xanh dương
    'Khá': '#10b981',     // xanh lá
    'Trung Bình': '#f59e0b', // vàng
    'Yếu': '#ef4444',     // đỏ
  };
  const labelOrder = ['Xuất Sắc', 'Giỏi', 'Khá', 'Trung Bình', 'Yếu'];
  const colors = ["#a259e6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  const defaultColors = labelOrder.map(label => colorMap[label]);

  // Hàm chuẩn hóa label để so sánh
  function normalizeLabel(label) {
    console.log('🔍 normalizeLabel:', label);
    if (!label) return '';
    return label.toString().trim().toLowerCase();
  }

  return (
    <Box boxShadow={isLOChart ? 0 : 3} p={isLOChart ? 0 : 2} display="flex" flexDirection="column" alignItems="center" gap={isLOChart ? "10px" : "20px"}>
      {/* Header trong Box chứa PieChart, có tiêu đề và dropdown filter */}
      {!isLOChart && (
        <h3 style={{ margin: 0 }}>
          {isLOChart
            ? `Tỷ lệ đạt/trượt - ${loCode}`
            : `(Biểu đồ tròn) Phân bố điểm theo ${formatFieldNameForFilter(selectedGradeField)}`
          }
        </h3>
      )}

      {/* Biểu đồ Pie */}
      <PieChart width={isLOChart ? 250 : 600} height={isLOChart ? 180 : 500}>
        <Pie
          data={pieChartData}
          dataKey="count"
          nameKey="label"
          cx="50%"
          cy="50%"
          outerRadius={isLOChart ? 60 : 150}
          fill="#8884d8"
          label={!isLOChart}
        >
          {pieChartData.map((entry, index) => {
            console.log("entry: ", entry);
            const normLabel = normalizeLabel(entry.label);
            console.log(normLabel);
            // Luôn lấy đúng màu theo label, fallback nếu không khớp
            return (
              <Cell
                key={`cell-${index}`}
                fill={colorMap[normLabel] || colors[index % colors.length]}
              />
            );
          })}
        </Pie>
        <Tooltip />
        <Legend
          payload={labelOrder
            .filter(label => pieChartData.some(d => normalizeLabel(d.label) === label))
            .map(label => ({
              value: label.charAt(0).toUpperCase() + label.slice(1).replace('binh', 'Bình'),
              type: 'circle',
              color: colorMap[label]
            }))
          }
        />
      </PieChart>
      {!isLOChart && selectedGrades && selectedGrades.length > 0 && (
        <FormControl variant="outlined" size="small" style={{ width: "200px" }}>
          <InputLabel id="grade-field-label">Chọn loại điểm</InputLabel>
          <Select
            labelId="grade-field-label"
            value={selectedGradeField}
            onChange={handleGradeFieldChange}
            label="Chọn loại điểm"
          >
            {selectedGrades.map((field) => (
              <MenuItem key={field} value={field}>
                {formatFieldNameForFilter(field)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  );
};