import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  useTheme,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CustomXAxisTick = ({ x, y, payload, width = 80 }) => {
  if (!payload?.value) return null;

  const maxCharsPerLine = Math.floor(width / 8); 
  const words = payload.value.split(" ");
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
        <tspan
          key={index}
          x={x}
          dy={index === 0 ? 0 : 11}
        >
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
          Môn học: {label}
        </Typography>
        <Divider sx={{ my: 1 }} />
        {payload.map((entry, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: entry.color,
              }}
            />
            <Typography variant="body2" color="#64748b">
              {entry.name}:
            </Typography>
            <Typography variant="body2" fontWeight="600" color="#0f172a">
              {entry.value} sinh viên
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

export function RiskStudentChart({ data = [] }) {
  const theme = useTheme();

  // Tạo dữ liệu mặc định khi không có data
  const defaultData = [
    { name: "Không có dữ liệu", atRisk: 0, students: 0 }
  ];

  const formattedData = Array.isArray(data) && data.length > 0 
    ? data.map((item) => ({
        name: item.name,
        atRisk: Number(item.failedStudents),
        students: Number(item.passedStudents),
      })).slice(0,4)
    : defaultData;

  const maxDataValue = Math.max(
    ...formattedData.map((d) => Math.max(d.atRisk, d.students))
  );
  const maxValue = Math.max(10, Math.ceil(maxDataValue / 10) * 10);

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
            <Typography variant="h6" fontWeight="700" color="#1e293b">
            Tỉ lệ đậu và rớt môn của sinh viên
            </Typography>
            <Typography variant="body2" color="#64748b">
            So sánh tỉ lệ sinh viên có nguy cơ trượt và có khả năng đạt giữa các môn học.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ height: 320, mb: 3, position: "relative"}}>
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
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={formattedData}
            margin={{ top: 35, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0"
              opacity={0.6}
            />
            <XAxis
              dataKey="name"
              interval={0} 
              // label={{
              //   value: "Môn học",
              //   position: "insideBottomRight",
              //   offset: -2,
              //   style: { fill: "#64748b", fontSize: 12, fontWeight: "bold" },
              // }}
              // tick={false}
              tick={<CustomXAxisTick width={150}/>} 
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
            <Tooltip content={<CustomTooltip />} />
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
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Chip
          icon={<CheckCircleIcon sx={{ fontSize: "1rem" }} />}
          label="Sinh viên có khả năng đạt"
          sx={{
            bgcolor: "#d1fae5",
            color: "#166534",
            fontWeight: 500,
            "& .MuiChip-icon": {
              color: "inherit",
            },
          }}
        />
        <Chip
          icon={<WarningIcon sx={{ fontSize: "1rem" }} />}
          label="Sinh viên có nguy cơ rớt"
          sx={{
            bgcolor: "#fee2e2",
            color: "#dc2626",
            fontWeight: 500,
            "& .MuiChip-icon": {
              color: "inherit",
            },
          }}
        />
      </Box>
    </Box>
  );
}
