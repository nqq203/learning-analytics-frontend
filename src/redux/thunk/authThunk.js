import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    authApi, 
    handleAuthApiError, 
} from "../api/auth";

export const register = createAsyncThunk(
    "auth/register", 
    async (data, { rejectWithValue }) => {
        try {
            // console.log(data);
            const response = await authApi.register(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAuthApiError(error.response.data));
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            // console.log(data);
            const response = await authApi.login(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAuthApiError(error.response.data));
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await authApi.logout();
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAuthApiError(error.response.data));
        }
    }
)

export const refresh = createAsyncThunk(
    "auth/refresh",
    async (_, { rejectWithValue }) => {
        try {
            const response = await authApi.refresh();
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAuthApiError(error.response.data));
        }
    }
)