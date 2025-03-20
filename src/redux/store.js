import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice";
import sidebarReducer from "./slice/sidebarSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
    }
})