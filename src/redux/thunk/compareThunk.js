import { createAsyncThunk } from "@reduxjs/toolkit";
import { compareApi } from "../api/compare";

export const fetchCompareByClassesThunk = createAsyncThunk(
  "compare/fetchByClasses",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await compareApi.fetchCompareByClasses(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCompareByCohortsThunk = createAsyncThunk(
  "compare/fetchByCohorts",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await compareApi.fetchCompareByCohorts(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);