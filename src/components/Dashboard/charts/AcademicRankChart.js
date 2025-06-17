import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";

const COLORS = ["#1E3A8A", "#2563EB", "#3B82F6", "#93C5FD", "#DBEAFE"];

export function AcademicRankChart() {
  const { academicRankData = [] } = useSelector((state) => state.dashboard);

  if (!Array.isArray(academicRankData) || academicRankData.length === 0)
    return <Typography>Không có dữ liệu</Typography>;

  return (
    <Grid item xs={12}>
      <Card sx={{ border: "1px solid #bbdefb", borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          {/* Title */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <DonutLargeRoundedIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" fontWeight="bold">
              Phân loại học lực
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Phân bố xếp loại học lực của sinh viên theo phần trăm.
          </Typography>

          <Grid container spacing={3}>
            {/* Donut Chart */}
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={academicRankData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={130}
                      startAngle={90}
                      endAngle={-270}
                      labelLine={false}
                    >
                      {academicRankData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>

            {/* Legend */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 6 }}>
                {academicRankData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "#EFF6FF",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: COLORS[index % COLORS.length],
                        }}
                      />
                      <Typography
                        fontWeight={600}
                        fontSize="1rem"
                        color="text.primary"
                      >
                        {item.name}
                      </Typography>
                    </Box>
                    <Typography
                      fontWeight={700}
                      fontSize="1rem"
                      sx={{ color: "#1E40AF" }}
                    >
                      {item.percentage}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
