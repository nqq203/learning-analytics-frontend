import React, { useMemo, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from "recharts";
import { Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";

// Mapping tên trường điểm sang label tiếng Việt (hoặc label tuỳ chọn)
const labelMap = {
  midtermGrade: "Điểm giữa kỳ",
  finalGrade: "Điểm cuối kỳ",
  projectGrade: "Điểm đồ án",
  practiceGrade: "Điểm thực hành",
  totalGrade: "Điểm tổng",
};

const colorPalette = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#8dd1e1",
  "#ff7300",
  "#d0ed57",
  "#a4de6c",
  "#413ea0",
  "#ffbb28",
  "#00C49F",
  "#FF8042",
];

const RadarChartAnalytics = ({ data, selectedGrades }) => {
  const studentOptions = useMemo(() => {
    return data.map((student) => ({
      id: student.identificationCode,
      label: `${student.fullName} (${student.identificationCode})`
    }));
  }, [data]);

  const [selectedStudentIds, setSelectedStudentIds] = useState(
    data.length > 0 ? [data[0].identificationCode] : []
  );

  const radarData = useMemo(() => {
    if (!selectedGrades || selectedGrades.length === 0 || data.length === 0 || selectedStudentIds.length === 0)
      return [];
    return selectedGrades.map((gradeKey) => {
      const subjectLabel = labelMap[gradeKey] || gradeKey;
      const obj = { subject: subjectLabel };

      // Điểm của từng sinh viên được chọn
      selectedStudentIds.forEach((studentId) => {
        const student = data.find((s) => s.identificationCode === studentId);
        const score = student ? parseFloat(student[gradeKey]) || 0 : 0;
        obj[studentId] = score;
      });

      // Tính trung bình lớp cho loại điểm đó
      const total = data.reduce((sum, student) => {
        return sum + (parseFloat(student[gradeKey]) || 0);
      }, 0);
      obj["average"] = total / data.length;

      return obj;
    });
  }, [data, selectedGrades, selectedStudentIds]);

  const maxScore = useMemo(() => {
    let maxVal = 10;
    selectedGrades.forEach((gradeKey) => {
      data.forEach((student) => {
        const val = parseFloat(student[gradeKey]) || 0;
        if (val > maxVal) maxVal = val;
      });
    });
    return maxVal;
  }, [data, selectedGrades]);

  return (
    <Box
      boxShadow={3}
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="20px"
    >
      <h3 style={{ margin: 0 }}>So sánh Sinh viên với Trung bình Lớp</h3>

      {/* Dropdown cho phép chọn nhiều sinh viên với giới hạn tối đa 4 */}
      <FormControl size="small" style={{ width: 300 }}>
        <InputLabel id="student-multiselect-label">Chọn sinh viên</InputLabel>
        <Select
          labelId="student-multiselect-label"
          label="Chọn sinh viên"
          multiple
          value={selectedStudentIds}
          onChange={(e) => setSelectedStudentIds(e.target.value)}
          renderValue={(selected) =>
            selected
              .map(
                (id) =>
                  studentOptions.find((option) => option.id === id)?.label || id
              )
              .join(", ")
          }
        >
          {studentOptions.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              disabled={
                selectedStudentIds.length >= 4 && selectedStudentIds.indexOf(option.id) === -1
              }
            >
              <Checkbox checked={selectedStudentIds.indexOf(option.id) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Radar Chart hiển thị dữ liệu của sinh viên được chọn và trung bình lớp */}
      {selectedGrades.length === 0 ? (
        <p>Vui lòng chọn ít nhất một loại điểm</p>
      ) : (
        <RadarChart
          cx={300}
          cy={250}
          outerRadius={150}
          width={600}
          height={500}
          data={radarData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, maxScore]} />
          <Tooltip />
          <Legend />
          {/* Radar cho trung bình lớp */}
          <Radar
            name="Trung bình lớp"
            dataKey="average"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          {/* Radar cho từng sinh viên được chọn */}
          {selectedStudentIds.map((studentId, index) => {
            const studentObj = data.find((s) => s.identificationCode === studentId);
            const displayName = studentObj
              ? `${studentObj.fullName} (${studentId})`
              : studentId;
            return (
              <Radar
                key={studentId}
                name={displayName}
                dataKey={studentId}
                stroke={colorPalette[index % colorPalette.length]}
                fill={colorPalette[index % colorPalette.length]}
                fillOpacity={0.4}
              />
            );
          })}
        </RadarChart>
      )}
    </Box>
  );
};

export default RadarChartAnalytics;