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

const CustomYAxisLabel = ({ x, y, payload }) => {
  if (payload && payload.value === 10) {
    return (
      <g transform={`translate(${x - 30},${y - 30})`}>
        <text x={0} y={0} dy={16} textAnchor="start" fill="#666">
          Điểm (10)
        </text>
      </g>
    );
  }

  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#666">
      {payload?.value ?? ""}
    </text>
  );
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
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "#bbdefb",
        borderRadius: 2,
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <ShowChartIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Điểm trung bình theo khóa
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Hiển thị xu hướng điểm số theo từng khóa và môn học.
        </Typography>

        {/* Chart */}
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={filteredData}
              margin={{ top: 30, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={{
                  value: "Khóa",
                  position: "insideBottomRight",
                  offset: -10,
                  style: { fill: "#666" },
                }}
                tick={{ fill: "#666" }}
              />
              <YAxis
                domain={[0, scale]}
                ticks={Array.from({ length: scale + 1 }, (_, i) => i)}
                tick={CustomYAxisLabel}
                axisLine={{ stroke: "#666" }}
                tickLine={{ stroke: "#666" }}
              />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ paddingBottom: "10px" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                name="Điểm trung bình"
                stroke="#3B82F6"
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 1,
            mt: 2,
          }}
        >
          <Chip
            label={`Môn học: ${subject || "Tất cả"}`}
            variant="outlined"
            color="primary"
          />
          <Chip
            label={`Loại điểm: ${scoreType || "Tất cả"}`}
            variant="outlined"
            color="primary"
          />
          <Chip
            label={`Thang điểm: ${scale}`}
            variant="outlined"
            color="primary"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
