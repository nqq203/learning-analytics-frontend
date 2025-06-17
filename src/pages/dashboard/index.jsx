import {
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilter } from "@/context/FilterContext";
import { FilterAlt } from "@mui/icons-material";

import { AvgScoreChart } from "@/components/Dashboard/charts/AvgScoreChart";
import { RiskStudentChart } from "@/components/Dashboard/charts/RiskStudentChart";
import { DashboardCards } from "@/components/Dashboard/charts/DashboardCards";
import { AcademicRankChart } from "@/components/Dashboard/charts/AcademicRankChart";

import {
  fetchDashboardCardsThunk,
  fetchSummaryThunk,
} from "@/redux/thunk/dashboardThunk";

export default function DashboardPage() {
  const { showFilters } = useFilter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSummaryThunk());
    dispatch(fetchDashboardCardsThunk());
  }, [dispatch]);

  const { academicRankData, avgScoreChart, riskStudentData } = useSelector(
    (state) => state.dashboard
  );

  const { cardsData } = useSelector((state) => state.dashboard);
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5faff ", p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Learning Analytics Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Giám sát tiến trình học tập và hiệu quả môn học của sinh viên.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<FilterAlt sx={{ color: "inherit" }} />}
          sx={{
            backgroundColor: "#fff",
            borderColor: "#bbdefb",
            color: "#1d4ed8",
            textTransform: "none",
            fontSize: "0.9rem",
            px: 2,
            py: 1,
            "&:hover": {
              backgroundColor: "#f0f9ff",
              borderColor: theme.palette.primary.dark,
            },
          }}
        >
          Filter
        </Button>
      </Box>

      {/* Stats Cards */}
      {cardsData && (
      <Box
        sx={{
          mb: 5,
        }}
      >
        <DashboardCards
          data={cardsData}
          sx={{
            border: "1px solid",
            borderColor: theme.palette.primary.main,
            borderRadius: 2,
          }}
        />
      </Box>
      )}

      {/* Charts */}
      <Box sx={{ width: "100%" }}>
        {/* Top charts */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AvgScoreChart data={avgScoreChart} />
          </Grid>
          <Grid item xs={12} md={6}>
            <RiskStudentChart data={riskStudentData} />
          </Grid>
        </Grid>

        {/* Bottom charts */}
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <AcademicRankChart data={academicRankData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
