import {
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  Paper,
  Divider,
} from "@mui/material";
import { useState, useMemo } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const CustomYAxisLabel = ({ x, y, payload }) => {
  if (payload && payload.value === 10) {
    return (
      <g transform={`translate(${x - 30},${y - 30})`}>
        <text x={0} y={0} dy={16} textAnchor="start" fill="#64748b" fontSize="12" fontWeight="bold">
          Điểm (10)
        </text>
      </g>
    );
  }

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
          Khóa: {label}
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
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

export function AvgScoreChart({ data = [] }) {
  const theme = useTheme();

  const [subject, setSubject] = useState("");
  const [scoreType, setScoreType] = useState("Trung bình");
  const [scale, setScale] = useState(10);

  const filteredData = useMemo(() => {
    return data; // tùy chọn thêm lọc nếu muốn
  }, [data]);

  const subjects = [...new Set(data.map((d) => d.subject))];
  const scoreTypes = [...new Set(data.map((d) => d.type))];

  if (!filteredData.length) return null;

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
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            <ShowChartIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="700" color="#1e293b">
            Điểm trung bình theo khóa
            </Typography>
            <Typography variant="body2" color="#64748b">
            Hiển thị xu hướng điểm số theo từng khóa và môn học.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ height: 320, mb: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0"
              opacity={0.6}
            />
            <XAxis
              dataKey="year"
              label={{
                value: "Khóa",
                position: "insideBottomRight",
                offset: -10,
                style: { fill: "#64748b", fontSize: 12, fontWeight: "bold" },
              }}
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              domain={[0, scale]}
              ticks={Array.from({ length: scale + 1 }, (_, i) => i)}
              tick={CustomYAxisLabel}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={{ stroke: "#e2e8f0" }}
              style={{ fontWeight: "bold" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ 
                paddingBottom: "10px",
                fontSize: "12px",
                color: "#64748b"
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              name="Điểm (10)"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ 
                r: 8, 
                stroke: "#3b82f6", 
                strokeWidth: 2,
                fill: "white"
              }}
              dot={{ 
                r: 4, 
                fill: "#3b82f6",
                stroke: "white",
                strokeWidth: 2
              }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </Box>

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: "1rem" }} />}
          label={`Môn học: ${subject || "Tất cả"}`}
          variant="outlined"
          sx={{
            borderColor: "#3b82f6",
            color: "#3b82f6",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#dbeafe",
            },
          }}
        />
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: "1rem" }} />}
          label={`Loại điểm: ${scoreType || "Tất cả"}`}
          variant="outlined"
          sx={{
            borderColor: "#10b981",
            color: "#10b981",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#d1fae5",
            },
          }}
        />
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: "1rem" }} />}
          label={`Thang: ${scale}`}
          variant="outlined"
          sx={{
            borderColor: "#8b5cf6",
            color: "#8b5cf6",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#ede9fe",
            },
          }}
        />
      </Box>
    </Box>
  );
}
