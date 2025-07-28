import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSummaryThunk,
  fetchAvgScoreChartThunk,
  fetchAcademicRankDataThunk,
  fetchSubjectsThunk,
  fetchDashboardCardsThunk,
} from "../thunk/dashboardThunk";

const initialState = {
  loading: false,
  error: null,
  summary: null,
  avgScoreChart: [],
  academicRankData: [],
  riskStudentData: [],
  passFailData: [],
  spendingTimeChartData: [],
  subjects: [],
  cardsData: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummaryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSummaryThunk.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("Payload from fetchSummaryThunk:", action.payload);
        const {
          academicRankData,
          avgScoreChart,
          riskStudentData,
          spendingTimeChartData,
          passFailData,
          subjects,
          cardData,
        } = action.payload ?? {};

        state.academicRankData = academicRankData ?? [];
        state.avgScoreChart = avgScoreChart ?? [];
        state.riskStudentData = riskStudentData ?? [];
        state.passFailData = passFailData ?? [];
        state.spendingTimeChartData = spendingTimeChartData ?? [];
        state.subjects = Array.isArray(subjects) ? subjects : [];
        state.cardsData = cardData ?? null;
      })
      .addCase(fetchSummaryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error || action?.error?.message;
        state.message =
          action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      });
    // .addCase(fetchDashboardCardsThunk.fulfilled, (state, action) => {
    //   state.cardsData = action.payload;
    //   state.loading = false;
    // })
    // .addCase(fetchDashboardCardsThunk.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchDashboardCardsThunk.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error =
    //     action.error?.message || "Không thể tải dữ liệu thống kê.";
    // });

    // Avg Score Chart
    //   .addCase(fetchAvgScoreChartThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchAvgScoreChartThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.avgScoreChart = action.payload;
    //   })
    //   .addCase(fetchAvgScoreChartThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   // Academic Rank
    //   .addCase(fetchAcademicRankDataThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchAcademicRankDataThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.academicRankData = action.payload;
    //   })
    //   .addCase(fetchAcademicRankDataThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })

    //   // Subjects
    //   .addCase(fetchSubjectsThunk.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(fetchSubjectsThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.subjects = action.payload;
    //   })
    //   .addCase(fetchSubjectsThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default dashboardSlice.reducer;
