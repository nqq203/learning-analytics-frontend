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

  // Mapping màu sắc đúng ý nghĩa
  const colorMap = {
    'xuất sắc': '#8884d8', // tím
    'giỏi': '#3b82f6',    // xanh dương
    'khá': '#10b981',     // xanh lá
    'trung bình': '#f59e0b', // vàng
    'yếu': '#ef4444',     // đỏ
    'không xác định': '#bdbdbd', // xám cho trường hợp không xác định
  };
  const labelOrder = ['xuất sắc', 'giỏi', 'khá', 'trung bình', 'yếu', 'không xác định'];
  const defaultColors = labelOrder.map(label => colorMap[label]);

  // Chuẩn hóa label
  function normalizeLabel(label) {
    if (!label) return '';
    return label.toString().normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase();
  }

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
          {classificationData.map((entry, index) => {
            const normLabel = normalizeLabel(entry.name);
            return (
              <Cell key={`cell-${index}`} fill={colorMap[normLabel] || defaultColors[index % defaultColors.length]} />
            );
          })}
        </Pie>
        <Tooltip />
        <Legend
          payload={labelOrder
            .filter(label => classificationData.some(d => normalizeLabel(d.name) === label))
            .map(label => ({
              value: label.charAt(0).toUpperCase() + label.slice(1).replace('binh', 'Bình'),
              type: 'circle',
              color: colorMap[label]
            }))
          }
        />
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
