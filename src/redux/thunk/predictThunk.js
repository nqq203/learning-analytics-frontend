import { createAsyncThunk } from '@reduxjs/toolkit';
import { predictApi } from '../api/predict';

export const predictGradesBatchThunk = createAsyncThunk(
  'predict/predictGradesBatch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await predictApi.predictGradesBatch(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
