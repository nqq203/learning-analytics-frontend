import { createSlice } from "@reduxjs/toolkit";
import {
    login,
    register,
    logout,
    refresh,
} from '../thunk/authThunk';
import { jwtDecode } from "jwt-decode";

const initialState = {
    accessToken: null,
    isAuthenticated: false,
    error: null,
    message: null,
    code: -1,
    loading: false,
    success: false,
    userId: -1,
    user: null
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
                state.code = action.payload.code;
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
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.accessToken = action.payload.data.accessToken;
                state.userId = action.payload.data.userId;
                state.isAuthenticated = true;
                const decodedToken = jwtDecode(action.payload.data.accessToken);
                console.log(decodedToken);
                state.user = decodedToken.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.isAuthenticated = false;
                state.accessToken = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            })
            .addCase(refresh.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.loading = false;
                state.code = action.payload.code;
                state.message = action.payload.message;
                state.accessToken = action.payload.data.accessToken;
                state.isAuthenticated = true;
            })
            .addCase(refresh.rejected, (state, action) => {
                state.loading = false;
                state.error = action?.payload?.error || action?.error?.message;
                state.message = action?.payload?.message || action?.message || action?.payload;
                state.code = action?.payload?.code || action?.code;
            });
    },
});

export const { clearError, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;