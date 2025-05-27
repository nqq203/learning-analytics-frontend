import { createSlice } from '@reduxjs/toolkit';
import { fetchCompareByClassesThunk, fetchCompareByCohortsThunk } from '../thunk/compareThunk';

const initialState = {
  compareResults: [],
  loading: false,
  error: null,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompareByClassesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompareByClassesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.compareResults = action.payload;
      })
      .addCase(fetchCompareByClassesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCompareByCohortsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompareByCohortsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.compareResults = action.payload;
      })
      .addCase(fetchCompareByCohortsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default compareSlice.reducer;
