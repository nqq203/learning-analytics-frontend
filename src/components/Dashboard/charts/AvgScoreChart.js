import { Box, Card, CardContent, Grid, Chip } from "@mui/material";
import { useState } from "react";
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

const CustomYAxisLabel = (props) => {
  const { x, y, payload } = props;

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
      {payload ? payload.value : ""}
    </text>
  );
};

export function AvgScoreChart({ data }) {
  const [subject, setSubject] = useState("Cơ sở dữ liệu");
  const [scoreType, setScoreType] = useState("Trung bình");
  const [scale, setScale] = useState(10);

  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
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
                  dataKey="year"
                  label={{
                    value: "Khóa",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />
                <YAxis
                  domain={[0, 10]}
                  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  tick={CustomYAxisLabel}
                  axisLine={{ stroke: "#666" }}
                  tickLine={{ stroke: "#666" }}
                  // Remove the standard label
                  label={null}
                />
                <Tooltip />
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
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}
          >
            <Chip label={`Môn học: ${subject}`} variant="outlined" />
            <Chip label={`Điểm: ${scoreType}`} variant="outlined" />
            <Chip label={`Thang: ${scale}`} variant="outlined" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
