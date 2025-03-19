import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
    authApi, 
    handleAuthApiError, 
} from "../api/auth";

export const register = createAsyncThunk(
    "auth/register", 
    async (data, { rejectWithValue }) => {
        try {
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
            const response = await authApi.register(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(handleAuthApiError(error.response.data));
        }
    }
)