import { createSlice } from '@reduxjs/toolkit';
import { predictGradesBatchThunk } from '../thunk/predictThunk';

const initialState = {
  loading: false,
  result: null,
  error: null,
};

const predictSlice = createSlice({
  name: 'predict',
  initialState,
  reducers: {
    clearPredictResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(predictGradesBatchThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(predictGradesBatchThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(predictGradesBatchThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Đã có lỗi xảy ra!';
      });
  },
});

export const { clearPredictResult } = predictSlice.actions;
export default predictSlice.reducer;
