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
    "data/updateClass",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateClass(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const createCourse = createAsyncThunk(
    "data/createCourse",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.createCourse(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const fetchAllCourses = createAsyncThunk(
    "data/fetchAllCourses",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchAllCourses(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleDataApiError(error.response.data));
        }
    }
)

export const processAllData = createAsyncThunk(
  "data/processAllData",
  async ({ instructorId, file }, { rejectWithValue }) => {
    try {
      const response = await dataApi.processAllData({ instructorId, file });
      return response.data;
    } catch (err) {
      const payload = err.response?.data ?? err;
      return rejectWithValue(handleDataApiError(payload));
    }
  }
);

export const processCourseData = createAsyncThunk(
  "data/processCourseData",
  async ({ instructorId, file }, { rejectWithValue }) => {
    try {
      const response = await dataApi.processCourseData({ instructorId, file });
      return response.data;
    } catch (err) {
      const payload = err.response?.data ?? err;
      return rejectWithValue(handleDataApiError(payload));
    }
  }
);

export const processFilePartly = createAsyncThunk(
  "data/processFilePartly",
  async (data, { rejectWithValue }) => {
    try {
      const response = await dataApi.processFilePartly(data);
      return response.data;
    } catch (err) {
      const payload = err.response?.data ?? err;
      return rejectWithValue(handleDataApiError(payload));
    }
  }
);