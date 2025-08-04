import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardApi } from "../api/dashboard";

export const fetchSummaryThunk = createAsyncThunk(
  "dashboard/fetchSummary",
  async (data, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.fetchSummary(data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAvgScoreChartThunk = createAsyncThunk(
  "dashboard/fetchAvgScoreChart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.fetchAvgScoreChart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAcademicRankDataThunk = createAsyncThunk(
  "dashboard/fetchAcademicRankData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.fetchAcademicRankData();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSubjectsThunk = createAsyncThunk(
  "dashboard/fetchSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.fetchSubjects();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDashboardCardsThunk  = createAsyncThunk(
  "dashboard/fetchStatsCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.fetchStatsCards();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
