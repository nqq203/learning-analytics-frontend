import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const ClassificationPieChart = ({ data }) => {
  // Tính phân bố xếp loại
  const classificationData = useMemo(() => {
    const counts = {};
    data.forEach((student) => {
      const cls = student.classification || "Không xác định";
      counts[cls] = (counts[cls] || 0) + 1;
    });
    return Object.entries(counts).map(([key, value]) => ({
      name: key,
      value,
    }));
  }, [data]);

  // Màu sắc cho các phân khúc (nếu có nhiều xếp loại thì bạn có thể mở rộng thêm)
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <Box boxShadow={3} p={2} display="flex" flexDirection="column" alignItems="center" gap="20px">
      {/* Chỉ hiển thị tiêu đề */}
      <h3 style={{ margin: 0 }}>Biểu đồ xếp loại</h3>

      <PieChart width={600} height={500}>
        <Pie
          data={classificationData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {classificationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* Phần hiển thị tổng số sinh viên với dấu chấm như legend */}
      <Box display="flex" alignItems="center" gap={1}>
        <Box width={12} height={12} borderRadius="50%" bgcolor="#8884d8" />
        <span>Tổng số sinh viên: {data.length}</span>
      </Box>
    </Box>
  );
};

export default ClassificationPieChart;
