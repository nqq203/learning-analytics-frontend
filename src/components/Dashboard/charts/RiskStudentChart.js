import {
  Box,
  Typography,
  useTheme,
  Paper,
  Divider,
  Chip,
  Snackbar,
  Alert,
  Tooltip as MUI_tooltip,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as Recharts_tooltip,

} from "recharts";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState, useCallback, useMemo } from "react";
import { LightbulbOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { fetchClassDetail } from "@/redux/thunk/dataThunk";

const CustomXAxisTick = ({ x, y, payload, width = 120 }) => {
  if (!payload?.value) return null;
  const maxCharsPerLine = Math.max(6, Math.floor(width / 8));
  const words = String(payload.value).split(" ");
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + " " + word).trim().length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += " " + word;
    }
  });
  if (currentLine) lines.push(currentLine.trim());

  return (
    <text
      x={x}
      y={y + 10}
      textAnchor="middle"
      fill="#64748b"
      fontSize="10"
      fontWeight="500"
    >
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : 11}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

const CustomBarChartYAxisLabel = ({ x, y, payload }) => {
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#64748b" fontSize="12">
      {payload?.value ?? ""}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          border: "1px solid #e2e8f0",
          borderRadius: 2,
          background: "white",
        }}
      >
        <Typography variant="subtitle2" fontWeight="600" color="#1e293b">
          {label}
        </Typography>
        <Divider sx={{ my: 1 }} />
        {payload.map((entry, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: entry.color,
              }}
            />
            <Typography variant="body2" color="#64748b">
              {entry.name}: {entry.value}
            </Typography>
          </Box>
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography
          variant="caption"
          color="#3b82f6"
          sx={{ fontStyle: "italic" }}
        >
          💡Click vào nhóm bar đại diện cho lớp để xem chi tiết điểm số.
        </Typography>
      </Paper>
    );
  }
  return null;
};

export function RiskStudentChart({ data = [], selectedSubject, selectedYear, instructorId }) {
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const defaultData = [{ name: "Không có dữ liệu", atRisk: 0, students: 0 }];

  const formattedData =
    Array.isArray(data) && data.length > 0
      ? data.map((item, index) => {
        const classId = item.classId || item.class_id || item.id;
        const courseId = item.courseId || item.course_id;
        return {
          name:
            item.name ||
            item.courseName ||
            item.subjectName ||
            `Môn học ${index + 1}`,
          atRisk: Number(
            item.failedStudents || item.atRisk || item.failed || 0
          ),
          students: Number(
            item.passedStudents || item.students || item.passed || 0
          ),
          classId,
          courseId,
          originalData: item,
        };
      })
      : defaultData;

  const maxDataValue = Math.max(...formattedData.map((d) => Math.max(d.atRisk, d.students)));
  const maxValue = Math.max(10, Math.ceil(maxDataValue / 10) * 10);

  const chartWidth = useMemo(() => {
    const itemWidth = 120;
    const minWidth = 600;
    const calc = formattedData.length * itemWidth;
    return Math.max(minWidth, calc);
  }, [formattedData.length]);

  const handleBarGroupClick = useCallback((dataEntry) => {
    const classId = dataEntry?.classId || dataEntry?.class_id || dataEntry?.id;
    const navigate = async () => {
      const response = await dispatch(fetchClassDetail({ classId, instructorId }));
      console.log(response);
      const _class = response.payload.data;
      if (classId && instructorId && _class?.className && _class?.courseName) {
        window.open(`/analytics/reports-and-statistics/${classId}?className=${_class?.className}&courseName=${_class?.courseName}`, "_blank");
      } else {
        window.open(`/analytics/reports-and-statistics/${classId}?`, "_blank");
      }
    };
    navigate();

  }, [dispatch, instructorId]);

  return (
    <Box sx={{ height: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <EqualizerIcon />
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" fontWeight="700" color="#1e293b">
                Tỉ lệ đậu và rớt môn của sinh viên
              </Typography>

              <MUI_tooltip
                arrow
                title={
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Hướng dẫn đọc & ý nghĩa biểu đồ Tỉ lệ đậu và rớt môn
                    </Typography>
                    <Typography variant="body2">
                      <strong>Cách đọc:</strong>
                      <br />
                      • Mỗi nhóm cột (bar) ứng với một môn/lớp.
                      <br />• Cột{" "}
                      <span style={{ color: "#34A853" }}>xanh lá</span>: số
                      lượng sinh viên có khả năng đạt.
                      <br />• Cột <span style={{ color: "#EA4335" }}>đỏ</span>:
                      số lượng sinh viên có nguy cơ rớt.
                      <br />
                      • Trục X: tên môn/lớp.
                      <br />
                      • Trục Y: số lượng sinh viên.
                      <br />
                      <br />
                      <strong>Ý nghĩa trong dữ liệu này:</strong>
                      <br />
                      • Giúp so sánh tỉ lệ đậu và rớt giữa các môn/lớp.
                      <br />
                      • Phát hiện những môn/lớp có tỉ lệ rớt cao để kịp thời hỗ
                      trợ sinh viên.
                      <br />• Hỗ trợ giảng viên và nhà trường đánh giá hiệu quả
                      giảng dạy và điều chỉnh chương trình.
                    </Typography>
                  </Box>
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#fff9db",
                      color: "#1e293b",
                      border: "1px solid #e2e8f0",
                      maxWidth: 400,
                    },
                  },
                }}
              >
                <LightbulbOutlined
                  sx={{
                    bgcolor: "#efb15a",
                    borderRadius: "50%",
                    p: "2px",
                    fontSize: 20,
                    color: "#ffffff",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }}
                />
              </MUI_tooltip>
            </Box>

            <Typography variant="body2" color="#64748b" sx={{ mt: 0.5 }}>
              So sánh tỉ lệ sinh viên có khả năng đạt và có nguy cơ rớt giữa các
              môn/lớp.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ height: 320, mb: 3, position: "relative" }}>
        <Typography
          variant="subtitle2"
          sx={{
            position: "absolute",
            top: -8,
            left: 10,
            fontSize: 12,
            color: "#64748b",
            zIndex: 1,
            fontWeight: "bold",
          }}
        >
          Số lượng sinh viên
        </Typography>

        <Box
          sx={{
            overflowX: "auto",
            width: "100%",
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f5f9",
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f5f9",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#cbd5e1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#94a3b8",
            },
          }}
        >
          <Box sx={{ minWidth: chartWidth, height: 320 }}>
            <ResponsiveContainer width={chartWidth} height="100%">
              <BarChart
                data={formattedData}
                margin={{ top: 35, right: 30, left: 20, bottom: 45 }}
                style={{ cursor: "pointer" }}
                onClick={(chartEvent) => {
                  if (!selectedSubject) return;
                  if (
                    !chartEvent?.activePayload ||
                    chartEvent.activePayload.length === 0
                  )
                    return;

                  const clickedData = chartEvent.activePayload[0]?.payload;

                  if (clickedData?.classId) {
                    handleBarGroupClick(clickedData);
                  }
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="name"
                  interval={0}
                  tick={<CustomXAxisTick width={120} />}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  domain={[0, maxValue]}
                  ticks={Array.from(
                    { length: maxValue / 10 + 1 },
                    (_, i) => i * 10
                  )}
                  tick={CustomBarChartYAxisLabel}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <Recharts_tooltip content={<CustomTooltip />} />

                <Bar
                  dataKey="students"
                  name="Sinh viên có khả năng đạt"
                  fill="#10b981"
                  barSize={24}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="atRisk"
                  name="Sinh viên có nguy cơ rớt"
                  fill="#ef4444"
                  barSize={24}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Chip
          icon={<CheckCircleIcon sx={{ fontSize: "1rem" }} />}
          label="Sinh viên có khả năng đạt"
          sx={{
            bgcolor: "#d1fae5",
            color: "#166534",
            fontWeight: 500,
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
        <Chip
          icon={<WarningIcon sx={{ fontSize: "1rem" }} />}
          label="Sinh viên có nguy cơ rớt"
          sx={{
            bgcolor: "#fee2e2",
            color: "#dc2626",
            fontWeight: 500,
            "& .MuiChip-icon": { color: "inherit" },
          }}
        />
      </Box>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert
          onClose={() => setErrorMessage("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
