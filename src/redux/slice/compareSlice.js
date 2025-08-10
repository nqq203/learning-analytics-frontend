import { createSlice } from '@reduxjs/toolkit';
import { fetchCompareByClassesThunk, fetchCompareByCohortsThunk,fetchCompareByCourse,fetchCompareByClassNew} from '../thunk/compareThunk';

const initialState = {
  compareResults: null,
  loading: false,
  error: null,
  course:[],
  classesNew:[],
  totalRecords:0,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    resetCompareResults: (state) => {
      state.compareResults = null;
    }
  },
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
      })


      .addCase(fetchCompareByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompareByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.data.items;
        state.totalRecords = action.payload.data.totalRecords;
      })
      .addCase(fetchCompareByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(fetchCompareByClassNew.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompareByClassNew.fulfilled, (state, action) => {
        state.loading = false;
        state.classesNew = action.payload.data.classesList;
        state.totalRecords = action.payload.data.totalRecords;
      })
      .addCase(fetchCompareByClassNew.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetCompareResults } = compareSlice.actions;
export default compareSlice.reducer;
