import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const PassFailPieChart = ({ data }) => {
  // Giả sử tiêu chí: nếu totalGrade >= 5 là đậu, ngược lại là rớt
  const passFailData = useMemo(() => {
    let pass = 0;
    let fail = 0;
    data.forEach((student) => {
      const total = parseFloat(student.totalGrade) || 0;
      if (total >= 5) {
        pass++;
      } else {
        fail++;
      }
    });
    return [
      { name: "Đậu", value: pass },
      { name: "Rớt", value: fail },
    ];
  }, [data]);

  // Tính điểm trung bình của tất cả sinh viên (totalGrade)
  const averageTotal = useMemo(() => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, student) => {
      return acc + (parseFloat(student.totalGrade) || 0);
    }, 0);
    return (sum / data.length).toFixed(2);
  }, [data]);

  // Màu sắc cho 2 phân khúc (đậu, rớt)
  const colors = ["#0088FE", "#FF8042"];

  return (
    <Box
      boxShadow={3}
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="20px"
    >
      {/* Tiêu đề */}
      <h3 style={{ margin: 0 }}>Biểu đồ tỉ lệ Đậu/Rớt</h3>

      {/* Biểu đồ */}
      <PieChart width={600} height={500}>
        <Pie
          data={passFailData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {passFailData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* Chú thích dưới tiêu đề */}
      <Box display="flex" alignItems="center" gap="20px">
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={12} height={12} borderRadius="50%" bgcolor="#8884d8" />
          <span>Tổng số sinh viên: {data.length}</span>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box width={12} height={12} borderRadius="50%" bgcolor="#8884d8" />
          <span>Điểm trung bình: {averageTotal}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default PassFailPieChart;
