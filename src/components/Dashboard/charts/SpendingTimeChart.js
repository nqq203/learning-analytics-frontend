import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { spendingTimeChartData } from "../constant";

export function SpendingTimeChart({ data }) {
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TableContainer
                component={Paper}
                sx={{ mt: 2, boxShadow: "none" }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nhóm thời gian</TableCell>
                      <TableCell>Số lượng sinh viên</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {spendingTimeChartData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: item.color,
                                mr: 1,
                              }}
                            />
                            {item.name}
                          </Box>
                        </TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{item.percentage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase" }}
                >
                  THỜI GIAN SỬ DỤNG TRUNG BÌNH
                </Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  2h15p
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
