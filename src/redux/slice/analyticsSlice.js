import { createSlice } from "@reduxjs/toolkit";
import {
  fetchClassesByLecturer,
  fetchSubjectsByLecturer,
  fetchStudentsDetails,
  fetchStudents,
  searchStudents,
  searchClasses,
  fetchLearningObjectivesCharts,
} from '../thunk/analyticsThunk';

const initialState = {
  classes: [],
  studentsOverview: [],
  error: null,
  message: null,
  code: -1,
  loading: false,
  subjects: [],
  studentsDetails: [],
  amount: 10,
  page: 1,
  totalRecords: 0,
  success: false,
  classAverageGrade: 0,
  studentCount: 0,
  details: false,
  compareResults: null, 
  compareLoading: false, 
  compareError: null,
  learningObjectivesData: null,
  learningObjectivesLoading: false,
  learningObjectivesError: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassesByLecturer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchClassesByLecturer.fulfilled, (state, action) => {
        state.loading = false;
        state.amount = action.payload.data.amount;
        state.page = action.payload.data.page;
        state.totalRecords = action.payload.data.totalRecords;
        state.classes = action.payload.data.classesList;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(fetchClassesByLecturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error || action?.error?.message;
        state.message = action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      })
      .addCase(fetchSubjectsByLecturer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSubjectsByLecturer.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload.data;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(fetchSubjectsByLecturer.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error || action?.error?.message;
        state.message = action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      })
      .addCase(fetchStudentsDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStudentsDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsDetails = action.payload.data.studentList;
        state.classAverageGrade = action.payload.data.classAverageGrade;
        state.studentCount = action.payload.data.studentCount;
        state.details = action.payload.data.details;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(fetchStudentsDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error || action?.error?.message;
        state.message = action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      })
      .addCase(fetchStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsOverview = action.payload.data.studentList;
        state.details = action.payload.data.details;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error || action?.error?.message;
        state.message = action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      })
      .addCase(searchStudents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.studentsOverview = action.payload.data.studentList;
        state.details = action.payload.data.details;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error || action?.error?.message;
        state.message = action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      })
      .addCase(searchClasses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload.data.classesList;
        state.amount = action.payload.data.amount;
        state.page = action.payload.data.page;
        state.totalRecords = action.payload.data.totalRecords;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(searchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.error || action?.error?.message;
        state.message = action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      })
      // Learning Objectives Charts
      .addCase(fetchLearningObjectivesCharts.pending, (state) => {
        state.learningObjectivesLoading = true;
        state.learningObjectivesError = null;
      })
      .addCase(fetchLearningObjectivesCharts.fulfilled, (state, action) => {
        state.learningObjectivesLoading = false;
        state.learningObjectivesData = action.payload.data;
        state.learningObjectivesError = null;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })
      .addCase(fetchLearningObjectivesCharts.rejected, (state, action) => {
        state.learningObjectivesLoading = false;
        state.learningObjectivesError = action?.payload?.error || action?.error?.message;
        state.message = action?.payload?.message || action?.message || action?.payload;
        state.code = action?.payload?.code || action?.code;
      })
  }
});

export const { clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;