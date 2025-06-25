import { createAsyncThunk } from '@reduxjs/toolkit';
import { predictApi } from '../api/predict';

export const predictGradesBatchThunk = createAsyncThunk(
  'predict/predictGradesBatch',
  async ({ outcomes, students }, { rejectWithValue }) => {
    try {
      const response = await predictApi.predictGradesBatch({ outcomes, students });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
