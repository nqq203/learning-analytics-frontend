import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomBarChartYAxisLabel = (props) => {
  const { x, y, payload } = props;

  if (payload && payload.value === 100) {
    return (
      <g transform={`translate(${x - 30},${y - 30})`}>
        <text x={0} y={0} dy={16} textAnchor="start" fill="#666">
          Số lượng sinh viên
        </text>
      </g>
    );
  }
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#666">
      {payload ? payload.value : ""}
    </text>
  );
};

export function RiskStudentChart({ data }) {
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ height: 311 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={data}
                margin={{
                  top: 30,
                  right: 30,
                  left: 20,
                  bottom: 25,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Môn học",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tick={CustomBarChartYAxisLabel}
                  axisLine={{ stroke: "#666" }}
                  tickLine={{ stroke: "#666" }}
                  label={null}
                />
                <Tooltip />
                <Bar
                  dataKey="students"
                  name="Số lượng sinh viên có khả năng đậu"
                  fill="#F6AD37"
                />
                <Bar
                  dataKey="atRisk"
                  name="Số lượng sinh viên có nguy cơ rớt"
                  fill="#3182CE"
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 1,
                  bgcolor: "#F6AD37",
                }}
              />
              <Typography variant="caption">
                Số lượng sinh viên có khả năng đậu
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 1,
                  bgcolor: "#3182CE",
                }}
              />
              <Typography variant="caption">
                Số lượng sinh viên có nguy cơ rớt
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
