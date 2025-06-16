import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
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

const CustomBarChartYAxisLabel = ({ x, y, payload }) => {
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#666">
      {payload?.value ?? ""}
    </text>
  );
};

export function RiskStudentChart({ data = [] }) {
  const theme = useTheme();

  if (!Array.isArray(data) || data.length === 0) return null;

  const formattedData = data.map((item) => ({
    ...item,
    atRisk: Number(item.atRisk),
    students: Number(item.students),
  }));

  const maxDataValue = Math.max(
    ...formattedData.map((d) => Math.max(d.atRisk, d.students))
  );
  const maxValue = Math.ceil(maxDataValue / 10) * 10;

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
          <EqualizerIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Phân tích khả năng đạt và rớt của học sinh
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          So sánh số lượng học sinh có nguy cơ trượt và học sinh có khả năng đạt
          giữa các môn học.
        </Typography>

        {/* Chart */}
        <Box sx={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={formattedData}
              margin={{ top: 30, right: 30, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                label={{
                  position: "insideBottomRight",
                  offset: -10,
                  style: { fill: "#666" },
                }}
                tick={{ fill: "#666" }}
              />
              <YAxis
                domain={[0, maxValue]}
                ticks={Array.from(
                  { length: maxValue / 10 + 1 },
                  (_, i) => i * 10
                )}
                tick={CustomBarChartYAxisLabel}
                axisLine={{ stroke: "#666" }}
                tickLine={{ stroke: "#666" }}
              />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Bar
                dataKey="students"
                name="Sinh viên có khả năng đạt"
                fill="#93C5FD"
                barSize={20}
              />
              <Bar
                dataKey="atRisk"
                name="Sinh viên có nguy cơ rớt"
                fill="#1E3A8A"
                barSize={20}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            mt: 2,
            justifyContent: "center",
          }}
        >
          <LegendItem color="#93C5FD" label="Sinh viên có khả năng đạt" />
          <LegendItem color="#1E3A8A" label="Sinh viên có nguy cơ rớt" />
        </Box>
      </CardContent>
    </Card>
  );
}

function LegendItem({ color, label }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: 1,
          bgcolor: color,
        }}
      />
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
}
