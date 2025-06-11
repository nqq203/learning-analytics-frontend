import { createSlice } from "@reduxjs/toolkit";
import {
    fetchClassList,
    fetchClassDetail,
    fetchAllFaculties,
    fetchAllMajors,
    fetchAllPrograms,
    deleteClass,
    updateClass,
    createProgram,
    createFaculty,
    createMajor,
    createCourse,
    fetchAllCourses,
    processAllData,
    processCourseData,
    processFilePartly,
} from "../thunk/dataThunk";

const initialState = {
    classList: [],
    _class: null,
    studentList: [],
    student: null,
    error: null,
    message: null,
    code: 0,
    loading: false,
    page: 1,
    amount: 10,
    totalRecords: 0,
    totalPrograms: 0,
    totalFaculties: 0,
    totalCourses: 0,
    totalMajors: 0,
    hasMore: 0,
    faculties: [],
    programs: [],
    majors: [],
    deletedClass: null,
    updatedClass: null,
    courses: [],
    processCsvResult: null,
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.message = null;
        },
        clearClassList: (state) => {
            state.classList = [];
            state.page = 1;
            state.hasMore = true;
        },
        clearClassDetail: (state) => {
            state._class = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassList.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchClassList.fulfilled, (state, action) => {
                state.loading = false;
                const newList = action.payload.data.classList || [];
                const existingIds = new Set(state.classList.map(item => item.classId));
                const filteredList = newList.filter(item => !existingIds.has(item.classId));
                state.classList = [...state.classList, ...filteredList];
                state.page = action.payload.data.page;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.amount = action.payload.data.amount;
                state.totalRecords = action.payload.data.totalRecords;
                state.hasMore = newList.length > 0;
            })
            .addCase(fetchClassList.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchClassDetail.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchClassDetail.fulfilled, (state, action) => {
                state.loading = false;
                state._class = action.payload.data;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(fetchClassDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllFaculties.pending, (state) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllFaculties.fulfilled, (state, action) => {
                state.loading = false;
                state.faculties = action.payload.data.items;
                state.totalFaculties = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllFaculties.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllMajors.pending, (state) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllMajors.fulfilled, (state, action) => {
                state.loading = false;
                state.majors = action.payload.data.items;
                state.totalMajors = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllMajors.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllPrograms.pending, (state) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllPrograms.fulfilled, (state, action) => {
                state.loading = false;
                state.programs = action.payload.data.items;
                state.totalPrograms = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllPrograms.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(deleteClass.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(deleteClass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
                state.deletedClass = action.payload.data.id;
            })
            .addCase(deleteClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(updateClass.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(updateClass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(updateClass.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createProgram.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createProgram.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createProgram.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createFaculty.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createFaculty.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createFaculty.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createMajor.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createMajor.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createMajor.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(createCourse.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(fetchAllCourses.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload.data.items;
                state.totalCourses = action.payload.data.totalRecords;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(fetchAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(processAllData.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(processAllData.fulfilled, (state, action) => {
                state.loading = false;
                state.processCsvResult = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(processAllData.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(processCourseData.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(processCourseData.fulfilled, (state, action) => {
                state.loading = false;
                state.processCsvResult = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(processCourseData.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(processFilePartly.pending, (state, action) => {
                state.loading = true;
                state.code = 0;
                state.message = null;
                state.error = null;
            })
            .addCase(processFilePartly.fulfilled, (state, action) => {
                state.loading = false;
                state.processCsvResult = action.payload.data;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.success = action.payload.success;
            })
            .addCase(processFilePartly.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
    }
});

export const { clearError, clearClassList, clearClassDetail } = dataSlice.actions;
export default dataSlice.reducer;