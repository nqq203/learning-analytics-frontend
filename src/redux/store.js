import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice";
import sidebarReducer from "./slice/sidebarSlice";
import analyticsReducer from "./slice/analyticsSlice";
import learningoutcomeReducer from "./slice/learningoutcomeSlice"
import fraudDetectionReducer from "./slice/fraudDetectionSlice"
export const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
        analytics: analyticsReducer,
        learningoutcome:learningoutcomeReducer,
        fraudDetection:fraudDetectionReducer
    }
})