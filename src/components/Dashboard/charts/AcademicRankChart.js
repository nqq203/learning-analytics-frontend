import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { academicRankData, subjects } from "../constant";

export function AcademicRankChart({ data }) {
  const [subject, setSubject] = useState("");
  const [classValue, setClassValue] = useState("");
  // const sortedData = [...data].sort((a, b) => b.value - a.value);
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
              <Box sx={{ mb: 2  }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={<Typography variant="body2">Xếp loại</Typography>}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label={
                      <Typography variant="body2">Tỉ lệ nộp bài</Typography>
                    }
                  />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Môn học</InputLabel>
                      <Select
                        value={subject}
                        label="Môn học"
                        onChange={(e) => setSubject(e.target.value)}
                      >
                        <MenuItem value="">Môn học</MenuItem>
                        {subjects.map((subject, index) => (
                          <MenuItem key={index} value={`subject-${index}`}>
                            {subject}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Lớp</InputLabel>
                      <Select
                        value={classValue}
                        label="Lớp"
                        onChange={(e) => setClassValue(e.target.value)}
                      >
                        <MenuItem value="">Lớp</MenuItem>
                        <MenuItem value="class-1">Lớp 1</MenuItem>
                        <MenuItem value="class-2">Lớp 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <TableContainer
                  component={Paper}
                  sx={{ mt: 2, boxShadow: "none" }}
                >
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Xếp loại</TableCell>
                        <TableCell>Giá trị</TableCell>
                        <TableCell>%</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {academicRankData.map((item, index) => (
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
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
