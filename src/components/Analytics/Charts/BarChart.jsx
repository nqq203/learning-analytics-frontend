import React, { useState, useEffect, useMemo } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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

  const [selectedBarFields, setSelectedBarFields] = useState([selectedGrades[0]]);

  const [barData, setBarData] = useState([]);

  const academicYearOptions = useMemo(() => {
    const yearsSet = new Set();
    data.forEach(item => {
      if (item.academicYear) {
        yearsSet.add(item.academicYear);
      }
    });
    return Array.from(yearsSet);
  }, [data]);

  const [selectedAcademicYears, setSelectedAcademicYears] = useState([]);

  useEffect(() => {
    if (academicYearOptions.length > 0 && selectedAcademicYears.length === 0) {
      setSelectedAcademicYears(academicYearOptions);
    }
  }, [academicYearOptions, selectedAcademicYears]);

  const colorMap = {
    midtermGrade: "#8884d8",
    finalGrade: "#82ca9d",
    projectGrade: "#ffc658",
    practiceGrade: "#d0ed57",
    totalGrade: "#a4de6c",
  };

  // Hàm convert dữ liệu cho BarChart với dữ liệu đã được lọc theo academicYear
  function convertDataForBarChart(data) {
    return data.map((item) => ({
      identificationCode: item.identificationCode,
      midtermGrade: parseFloat(item.midtermGrade),
      finalGrade: parseFloat(item.finalGrade),
      projectGrade: parseFloat(item.projectGrade),
      practiceGrade: parseFloat(item.practiceGrade),
      totalGrade: parseFloat(item.totalGrade),
    }));
  };

  // Lọc dữ liệu theo academicYear và convert dữ liệu cho BarChart
  useEffect(() => {
    const filteredData = data.filter(item =>
      selectedAcademicYears.includes(item.academicYear)
    );
    const converted = convertDataForBarChart(filteredData);
    setBarData(converted);
  }, [data, selectedAcademicYears]);

  // Xử lý thay đổi cho dropdown chọn loại điểm
  const handleFieldChange = (e) => {
    const { value } = e.target;
    setSelectedBarFields(value);
  };

  // Xử lý thay đổi cho dropdown chọn khóa
  const handleAcademicYearChange = (e) => {
    const { value } = e.target;
    // Nếu value là chuỗi thì chuyển thành mảng, ngược lại lấy nguyên mảng
    setSelectedAcademicYears(typeof value === "string" ? value.split(",") : value);
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
        (Biểu đồ cột) So sánh điểm giữa nhiều thành phần và nhiều sinh viên
      </h3>

      {/* Render BarChart */}
      <BarChart width={600} height={500} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="identificationCode" />
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
        {/* Dropdown filter cho khóa (academicYear) */}
        <FormControl size="small" style={{ width: 300 }}>
          <InputLabel id="academic-year-label">Chọn khóa</InputLabel>
          <Select
            labelId="academic-year-label"
            multiple
            value={selectedAcademicYears}
            onChange={handleAcademicYearChange}
            label="Chọn khóa"
            renderValue={(selected) => selected.join(", ")}
          >
            {academicYearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
