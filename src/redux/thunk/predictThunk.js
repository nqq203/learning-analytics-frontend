import { createAsyncThunk } from '@reduxjs/toolkit';
import { predictApi } from '../api/predict';

export const predictGradesBatchThunk = createAsyncThunk(
  'predict/predictGradesBatch',
  async (data, { rejectWithValue }) => {
    try {
      const { signal, ...rest } = data;
      const response = await predictApi.predictGradesBatch(rest, signal ? { signal } : {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
