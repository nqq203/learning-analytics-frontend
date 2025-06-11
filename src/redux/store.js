import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slice/authSlice";
import sidebarReducer from "./slice/sidebarSlice";
import compareReducer from "./slice/compareSlice";
import analyticsReducer from "./slice/analyticsSlice";
import learningoutcomeReducer from "./slice/learningoutcomeSlice";
import fraudDetectionReducer from "./slice/fraudDetectionSlice";
import dataReducer from "./slice/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    compare: compareReducer,
    sidebar: sidebarReducer,
    analytics: analyticsReducer,
    learningoutcome: learningoutcomeReducer,
    fraudDetection: fraudDetectionReducer,
    data: dataReducer,
  },
});