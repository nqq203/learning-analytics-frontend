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

const handleCompareApiError = (error) => {
  if (error.message) {
    if (error && error.message) {
      return error.message;
    }
    if (error.status === 404) {
      return "Service not found. Please try again later.";
    }
    if (error.status === 401) {
      return "Invalid credentials";
    }
    if (error.status === 400) {
      return "Invalid input. Please check your details.";
    }
    return "Server error. Please try again later.";
  }
  return "Something went wrong. Please try again.";
};

const compareApi = {
  fetchCompareByClasses: (data) =>
    axios.post(`${API_URL}/comparison/classes`, data),

  fetchCompareByCohorts : (data) =>
    axios.post(`${API_URL}/comparison/cohorts`, data),
  
};

export { compareApi, handleCompareApiError };

