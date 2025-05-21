import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
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
import {
  academicRankData,
  avgScoreChart,
  riskStudentData,
  spendingTimeChartData,
  subjects,
} from "./constant";
import { useState } from "react";
import { FilterAlt } from "@mui/icons-material";
import { AcademicRankChart } from "./charts/AcademicRankChart";
import { RiskStudentChart } from "./charts/RiskStudentChart";
import { SpendingTimeChart } from "./charts/SpendingTimeChart";
import { AvgScoreChart } from "./charts/AvgScoreChart";
import { DashboardCards } from "./charts/DashboardCards";
import { useFilter } from "@/context/FilterContext";
export default function DashboardPage() {
  // const [showFilters, setShowFilters] = useState(false);
  const {showFilters} = useFilter();
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "inherit" }}>
      {/* Header */}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "white",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            sx={{ bgcolor: showFilters ? "#f5f5f5" : "transparent" }}
          >
            <FilterAlt />
          </IconButton>
        </Box>
        
      </Box> */}

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {/* Stats Cards */}
          <DashboardCards data={{subjects: 25,classes: 40,students: 500,dropoutRate: 20}} />

          {/* Line and Bar Charts */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Line Chart */}
            <AvgScoreChart data={avgScoreChart} />
            {/* Bar Chart */}
            <RiskStudentChart data={riskStudentData} />
          </Grid>

          {/* Pie Charts */}
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Pie Chart 1 */}
            <AcademicRankChart data={academicRankData} />
            {/* Pie Chart 2 */}
            <SpendingTimeChart data={spendingTimeChartData} />
          </Grid>
        </Box>

        {/* Filter Sidebar */}
        {showFilters && (
          <Box
            sx={{
              width: 320,
              borderLeft: "1px solid #e0e0e0",
              bgcolor: "white",
              p: 3,
              overflowY: "auto",
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Môn học
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 2, maxHeight: 240, overflowY: "auto" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={
                      <Typography variant="body2" fontWeight="medium">
                        Tất cả
                      </Typography>
                    }
                  />
                  {subjects.map((subject, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      label={<Typography variant="body2">{subject}</Typography>}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Môn học
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 2, maxHeight: 240, overflowY: "auto" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={
                      <Typography variant="body2" fontWeight="medium">
                        Tất cả
                      </Typography>
                    }
                  />
                  {subjects.map((subject, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      label={<Typography variant="body2">{subject}</Typography>}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Môn học
              </Typography>
              <Paper
                variant="outlined"
                sx={{ p: 2, maxHeight: 240, overflowY: "auto" }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={
                      <Typography variant="body2" fontWeight="medium">
                        Tất cả
                      </Typography>
                    }
                  />
                  {subjects.map((subject, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      label={<Typography variant="body2">{subject}</Typography>}
                    />
                  ))}
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
