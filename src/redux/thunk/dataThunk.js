import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    dataApi,
    handleDataApiError,
} from "../api/data";

export const fetchClassList = createAsyncThunk(
    "data/fetchClassList",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchClassList(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const fetchClassDetail = createAsyncThunk(
    "data/fetchClassDetail",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchClassDetail(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const fetchAllMajors = createAsyncThunk(
    "data/fetchAllMajors",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchAllMajors(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const fetchAllFaculties = createAsyncThunk(
    "data/fetchAllFaculties",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchAllFaculties(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const fetchAllPrograms = createAsyncThunk(
    "data/fetchAllPrograms",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchAllPrograms(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const deleteClass = createAsyncThunk(
    "data/deleteClass",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.deleteClass(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const createMajor = createAsyncThunk(
    "data/createMajor",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.createMajor(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const createFaculty = createAsyncThunk(
    "data/createFaculty",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.createFaculty(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const createProgram = createAsyncThunk(
    "data/createProgram",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.createProgram(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const createClass = createAsyncThunk(
    "data/createClass",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.createClass(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const updateClass = createAsyncThunk(
    "data/createClass",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateClass(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)