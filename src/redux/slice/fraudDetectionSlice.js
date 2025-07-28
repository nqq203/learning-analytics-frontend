import { createSlice } from "@reduxjs/toolkit";
import { fetchFraudDetect, fetchClassesByLecturer, fetchImportQuizFile } from "../thunk/fraudDetectionThunk";

const initialState = {
    code: -1,
    message: null,
    success: false,
    loading: false,
    error: null,
    classes: [],
    students: [],
    activities: -1,
    quizImport: null,



}

const fraudDetectionSlice = createSlice({
    name: "fraudDetection",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.message = null;
        },
        clearStudents: (state) => {
            state.students = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassesByLecturer.pending, (state, action) => {
                state.loading = true;
            })

            .addCase(fetchClassesByLecturer.fulfilled, (state, action) => {
                state.loading = false;

                state.classes = action.payload.data;

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


            .addCase(fetchFraudDetect.pending, (state, action) => {
                state.loading = true;
            })

            .addCase(fetchFraudDetect.fulfilled, (state, action) => {
                state.loading = false;

                state.students = action.payload.data;

                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })

            .addCase(fetchFraudDetect.rejected, (state, action) => {
                state.loading = false;

                state.error = action?.payload?.error || action?.error?.message;

                state.message = action?.payload?.message || action?.message || action?.payload;

                state.code = action?.payload?.code || action?.code;
            })


            .addCase(fetchImportQuizFile.pending, (state, action) => {
                state.loading = true;
            })

            .addCase(fetchImportQuizFile.fulfilled, (state, action) => {
                state.loading = false;

                state.quizImport = action.payload.data;

                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })

            .addCase(fetchImportQuizFile.rejected, (state, action) => {
                state.loading = false;

                state.error = action?.payload?.error || action?.error?.message;

                state.message = action?.payload?.message || action?.message || action?.payload;

                state.code = action?.payload?.code || action?.code;
            })
    }

})

export const { clearError, clearStudents } = fraudDetectionSlice.actions;
export default fraudDetectionSlice.reducer;