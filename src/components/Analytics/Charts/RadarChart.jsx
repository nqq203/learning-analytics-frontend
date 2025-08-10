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
  "#ef4444",
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
  loData = null,
  loType = "",
}) => {

  // Handle LO Chart data differently
  if (isLOChart && loData) {

    // Validate loData
    if (!Array.isArray(loData) || loData.length === 0) {
      return (
        <Box p={2} textAlign="center" sx={{ color: '#666' }}>
          <p>Không có dữ liệu nhóm cho radar chart</p>
        </Box>
      );
    }

    const transformedData = [];

    // Get all unique LO codes from all groups
    const allLoCodes = [...new Set(
      loData.flatMap(group => {
        if (group.loAverages && Array.isArray(group.loAverages)) {
          return group.loAverages.map(lo => lo.loCode);
        }
        return [];
      })
    )];

    if (allLoCodes.length === 0) {
      return (
        <Box p={2} textAlign="center" sx={{ color: '#666' }}>
          <p>Không có Learning Objectives để hiển thị</p>
        </Box>
      );
    }

    // Create data points for each LO
    allLoCodes.forEach(loCode => {
      const dataPoint = { loCode };

      loData.forEach(group => {
        if (group.loAverages && Array.isArray(group.loAverages)) {
          const loScore = group.loAverages.find(lo => lo.loCode === loCode);

          if (loType === 'finalExam') {
            // For finalExam, use averageCompletion (percentage)
            dataPoint[group.groupName] = loScore ? parseFloat(loScore.averageCompletion || 0) : 0;
          } else {
            // For assignmentQuiz, use averageScore (0-10 scale)
            dataPoint[group.groupName] = loScore ? (loScore.averageScore || 0) : 0;
          }
        }
      });

      transformedData.push(dataPoint);
    });

    // Determine domain based on loType
    const domain = loType === 'finalExam' ? [0, 100] : [0, 10];
    const unit = loType === 'finalExam' ? '%' : '';

    return (
      <Box
        boxShadow={3}
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        sx={{ width: '100%' }}
      >
        <h3 style={{ margin: 0, fontSize: '16px' }}>
          {loType === 'finalExam' ?
            '🎯 Phân tích nhóm - Bài kiểm tra cuối kỳ (% hoàn thành)' :
            '🎯 Phân tích nhóm - Bài tập/Quiz (điểm số)'
          }
        </h3>

        {/* Debug Info */}
        <Box sx={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
          <div>📊 Nhóm: {loData.length} | LO: {allLoCodes.length} | Thang đo: {domain[1]}{unit}</div>
        </Box>

        <RadarChart
          cx={300}
          cy={200}
          outerRadius={150}
          width={600}
          height={400}
          data={transformedData}
          style={{ top: "-40px" }}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="loCode"
            tick={{ fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={domain}
            tick={{ fontSize: 10 }}
            tickCount={6}
          />
          <Tooltip
            formatter={(value, name) => [
              `${value.toFixed(1)}${unit}`,
              name
            ]}
            labelFormatter={(label) => `LO: ${label}`}
          />
          <Legend
            wrapperStyle={{
              bottom: '-50px',
              position: 'absolute !important',
              left: '50%',
              // transform: 'translateX(-50%)',
              zIndex: 1000
            }}
          />

          {loData.map((group, index) => (
            <Radar
              key={group.groupName}
              name={group.groupName || `Nhóm ${index + 1}`}
              dataKey={group.groupName || `Nhóm ${index + 1}`}
              stroke={colorPalette[index % colorPalette.length]}
              fill={colorPalette[index % colorPalette.length]}
              fillOpacity={0.3}
              strokeWidth={2}
            />
          ))}
        </RadarChart>

        {/* Summary */}
        <Box sx={{ fontSize: '11px', color: '#666', textAlign: 'center', mt: 1 }}>
          <div>📈 Nhóm có hiệu suất cao nhất: <strong>{
            loData.reduce((best, group) => {
              const groupAvg = group.loAverages?.reduce((sum, lo) => {
                const value = loType === 'finalExam' ?
                  parseFloat(lo.averageCompletion || 0) :
                  (lo.averageScore || 0);
                return sum + value;
              }, 0) / (group.loAverages?.length || 1);

              const bestAvg = best.loAverages?.reduce((sum, lo) => {
                const value = loType === 'finalExam' ?
                  parseFloat(lo.averageCompletion || 0) :
                  (lo.averageScore || 0);
                return sum + value;
              }, 0) / (best.loAverages?.length || 1);

              return groupAvg > bestAvg ? group : best;
            }).groupName
          }</strong></div>
        </Box>
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
          <Radar
            name="Trung bình lớp"
            dataKey="average"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
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