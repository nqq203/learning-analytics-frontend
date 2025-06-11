import { createSlice } from "@reduxjs/toolkit";
import {
    fetchClassList,
    fetchClassDetail,
    fetchAllFaculties,
    fetchAllMajors,
    fetchAllPrograms,
    deleteClass,
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
    totalMajors: 0,
    hasMore: 0,
    faculties: [],
    programs: [],
    majors: [],
    deletedClass: null,
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
            })
            .addCase(deleteClass.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
                state.deletedClass = action.payload.data.id;
            })
    }
});

export const { clearError, clearClassList, clearClassDetail } = dataSlice.actions;
export default dataSlice.reducer;