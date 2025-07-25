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

const RadarChartAnalytics = ({ 
  data = [], 
  selectedGrades = [], 
  isLOChart = false,
  loData = null
}) => {
  // Handle LO Chart data differently
  if (isLOChart && loData) {
    // Transform LO data for radar chart
    const transformedData = [];
    
    // Get all unique LO codes from all groups
    const allLoCodes = [...new Set(
      loData.flatMap(group => group.loAverages.map(lo => lo.loCode))
    )];
    
    // Create data points for each LO
    allLoCodes.forEach(loCode => {
      const dataPoint = { loCode };
      loData.forEach(group => {
        const loScore = group.loAverages.find(lo => lo.loCode === loCode);
        dataPoint[group.groupName] = loScore ? loScore.averageScore : 0;
      });
      transformedData.push(dataPoint);
    });

    return (
      <Box
        boxShadow={3}
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
      >
        <h3 style={{ margin: 0, fontSize: '16px' }}>
          Phân tích nhóm sinh viên theo LO
        </h3>
        
        <RadarChart
          cx={250}
          cy={200}
          outerRadius={120}
          width={500}
          height={400}
          data={transformedData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="loCode" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Tooltip />
          <Legend />
          {loData.map((group, index) => (
            <Radar
              key={group.groupName}
              name={group.groupName}
              dataKey={group.groupName}
              stroke={colorPalette[index % colorPalette.length]}
              fill={colorPalette[index % colorPalette.length]}
              fillOpacity={0.4}
            />
          ))}
        </RadarChart>
      </Box>
    );
  }

  // For regular charts, ensure we have valid data
  if (!data || !Array.isArray(data) || !selectedGrades || !Array.isArray(selectedGrades)) {
    return (
      <Box p={2} textAlign="center">
        <p>Vui lòng chọn loại điểm để hiển thị biểu đồ radar</p>
      </Box>
    );
  }

  const studentOptions = useMemo(() => {
    return data.map((student) => ({
      id: student.identificationCode,
      label: `${student.fullName} (${student.identificationCode})`
    }));
  }, [data]);

  const [selectedStudentIds, setSelectedStudentIds] = useState(
    data && data.length > 0 ? [data[0].identificationCode] : []
  );

  const radarData = useMemo(() => {
    if (!selectedGrades || !Array.isArray(selectedGrades) || selectedGrades.length === 0 || 
        !data || !Array.isArray(data) || data.length === 0 || 
        !selectedStudentIds || !Array.isArray(selectedStudentIds) || selectedStudentIds.length === 0)
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
    if (!selectedGrades || !Array.isArray(selectedGrades) || !data || !Array.isArray(data)) {
      return 10;
    }
    
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
      {!selectedGrades || selectedGrades.length === 0 ? (
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