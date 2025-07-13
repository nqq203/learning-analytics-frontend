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

export const processStudentData = createAsyncThunk(
    "data/processStudentData",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.processStudentInformation(data);
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

export const fetchAcademicyear = createAsyncThunk(
    "data/fetchAcademicYear",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.getAcademicYear(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const fetchSemester = createAsyncThunk(
    "data/fetchSemester",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.getSemester(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const deleteFaculty = createAsyncThunk(
    "data/deleteFaculty",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.deleteFaculty(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const deleteMajor = createAsyncThunk(
    "data/deleteMajor",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.deleteMajor(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const deleteProgram = createAsyncThunk(
    "data/deleteProgram",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.deleteProgram(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "data/deleteCourse",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.deleteCourse(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const updateCourse = createAsyncThunk(
    "data/updateCourse",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateCourse(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const updateProgram = createAsyncThunk(
    "data/updateProgram",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateProgram(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const updateFaculty = createAsyncThunk(
    "data/updateFaculty",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateFaculty(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const updateMajor = createAsyncThunk(
    "data/updateMajor",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateMajor(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const fetchStudentList = createAsyncThunk(
    "data/fetchStudentList",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchStudentList(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const createStudent = createAsyncThunk(
    "data/createStudent",
    async (data, { rejectWithValue }) => {
        try {
            console.log("data: ",data)
            const response = await dataApi.createStudent(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const updateStudent = createAsyncThunk(
    "data/updateStudent",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateStudent(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const fetchStudentDetail = createAsyncThunk(
    "data/fetchStudentDetail",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchStudentDetail(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const deleteStudentFromClass = createAsyncThunk(
    "data/deleteStudentFromClass",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.deleteStudentFromClass(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);


export const fetchAllExam = createAsyncThunk(
    "data/fetchAllExam",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchAllExam(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const fetchExamDetail = createAsyncThunk(
    "data/fetchExamDetail",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchExamDetail(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const createExam = createAsyncThunk(
    "data/createExam",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.createExam(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const updateExam = createAsyncThunk(
    "data/updateExam",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.updateExam(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const deleteExam = createAsyncThunk(
    "data/deleteExam",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.deleteExam(data);
            console.log("Response original data: ", response.data)
            console.log("Response original response: ", response)
            return response.data;
        } catch (err) {
            console.log("payload: ",payload);
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);

export const fetchAllStudent = createAsyncThunk(
    "data/fetchAllStudent",
    async (data, { rejectWithValue }) => {
        try {
            const response = await dataApi.fetchStudentList(data);
            return response.data;
        } catch (err) {
            const payload = err.response?.data ?? err;
            return rejectWithValue(handleDataApiError(payload));
        }
    }
);