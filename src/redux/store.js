import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice";
import sidebarReducer from "./slice/sidebarSlice";
import analyticsReducer from "./slice/analyticsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        analytics: analyticsReducer,
    }
})