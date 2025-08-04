import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  analyticsApi,
  handleAnalyticsApiError
} from '../api/analytics';

export const fetchClassesByLecturer = createAsyncThunk(
  "analytics/fetchClassesByLecturer",
  async ({ userId, page, amount }, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.fetchClassesByLecturer({ userId, page, amount });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAnalyticsApiError(error.response.data));
    }
  }
);

export const fetchSubjectsByLecturer = createAsyncThunk(
  "analytics/fetchSubjectsByLecturer",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.fetchSubjectsByLecturer({ userId });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAnalyticsApiError(error.response.data));
    }
  }
);

export const fetchStudentsDetails = createAsyncThunk(
  "analytics/fetchStudentsDetails",
  async ({ classId, details = true }, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.fetchStudentsDetails({ classId, details });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAnalyticsApiError(error.response.data));
    }
  }
);

export const fetchStudents = createAsyncThunk(
  "analytics/fetchStudents",
  async ({ classId, details = false }, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.fetchStudents({ classId, details });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAnalyticsApiError(error.response.data));
    }
  }
);

export const searchStudents = createAsyncThunk(
  "analytics/searchStudents",
  async ({ classId, details, search }, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.searchStudents({ classId, details, search });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAnalyticsApiError(error.response.data));
    }
  }
);

export const searchClasses = createAsyncThunk(
  "analytics/searchClasses",
  async ({ userId, page, amount, search, subject, className  }, { rejectWithValue }) => {
    try {
      
      const response = await analyticsApi.searchClasses({ userId, page, amount, search, subject, className  });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAnalyticsApiError(error.response.data));
    }
  }
);

export const fetchLearningObjectivesCharts = createAsyncThunk(
  "analytics/fetchLearningObjectivesCharts",
  async ({ classId, finalExamId }, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.fetchLOCharts({ classId, finalExamId });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAnalyticsApiError(error.response.data));
    }
  }
);