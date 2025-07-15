import axios from "axios";
import { store } from "../store";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Add a request interceptor to include Bearer token from Redux store
axios.interceptors.request.use(
  (config) => {
    // Adjust the path to access token in your redux state as needed
    const state = store.getState();
    const accessToken = state?.auth?.accessToken;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

const predictApi = {
  predictGradesBatch: (payload, config = {}) =>
    axios.post(`${API_URL}/predict/grades_batch`, payload, config),
};

export { predictApi };
