import { createSlice } from "@reduxjs/toolkit";
import {
    login,
    register,
} from '../thunk/authThunk';

const initialState = {
    accessToken: null,
    isAuthenticated: false,
    error: null,
    message: null,
    code: -1,
    loading: false,
    success: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = true;
        },
        clearError: (state) => {
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.success = action.payload.success;
                state.code = state.action.payload.code;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.data.accessToken;
                state.isAuthenticated = true;
                state.message = action.payload.message;
                state.code = action.payload.code;
                state.success = action.payload.success;
                localStorage.setItem("refreshToken", action.payload.refreshToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            });
    },
});

export const { clearError, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;