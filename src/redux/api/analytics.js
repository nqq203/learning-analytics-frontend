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

const handleAnalyticsApiError = (error) => {
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

const analyticsApi = {
  fetchClassesByLecturer: ({ userId, page, amount }) =>
    axios.get(
      `${API_URL}/analytics/classes?user_id=${userId}&page=${page}&amount=${amount}`
    ),
  fetchSubjectsByLecturer: ({ userId }) =>
    axios.get(`${API_URL}/analytics/course?user_id=${userId}`),
  fetchStudentsDetails: ({ classId, details = true }) =>
    axios.get(
      `${API_URL}/analytics/students?class_id=${classId}&details=${details}`
    ),
  fetchStudents: ({ classId, details = false }) =>
    axios.get(
      `${API_URL}/analytics/students?class_id=${classId}&details=${details}`
    ),
  searchStudents: ({ classId, details, search }) =>
    axios.get(
      `${API_URL}/analytics/student?class_id=${classId}&details=${details}&search=${search}`
    ),
  searchClasses: ({ userId, page, amount, search, subject, className }) =>
    axios.get(
      `${API_URL}/analytics/classes?user_id=${userId}&page=${page}&amount=${amount}&search=${search}&subject=${subject}&class_name=${className}`
    ),
  fetchLOCharts: ({ classId, finalExamId }) => 
    axios.get(
      `${API_URL}/analytics/classes/lo-chart?class_id=${classId}&final_exam_id=${finalExamId}`
    ),
};

export { analyticsApi, handleAnalyticsApiError };
