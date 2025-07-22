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

const handleLearningOutcomeApiError = (error) => {
  if (error && error.status) {
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
  return error.message || "Something went wrong. Please try again.";
};

const LearningOutcomeApi = {
  fetchClassesByLecturer: ({
    userId,
    page,
    amount
  }) => axios.get(`${API_URL}/learning-outcome/classes?instructor_id=${userId}&page=${page}&amount=${amount}`)
  ,

  fetchStudent: ({
    userId,
    classId,
    page,
    amount
  }) => axios.get(`${API_URL}/learning-outcome/students?instructor_id=${userId}&class_id=${classId}&page=${page}&amount=${amount}`),

  fetchStudentDetail: ({
    studentId,
    userId,
    classId
  }) => axios.get(`${API_URL}/learning-outcome/students/${studentId}?instructor_id=${userId}&class_id=${classId}`),


  FilterClass: ({
    userId,
    page,
    amount,
    semester,
    academicYear,
    search
  }) => axios.get(`${API_URL}/learning-outcome/classes?instructor_id=${userId}&page=${page}&amount=${amount}&semester=${semester}&academic_year=${academicYear}&search=${search}`),

  FetchStudentSearch:({
    classId,
    page,
    amount,
    userId,
    search
  }) => axios.get(`${API_URL}/learning-outcome/students?class_id=${classId}&page=${page}&amount=${amount}&instructor_id=${userId}&search=${search}`),

  FetchAcademicYearClass:({
    userId
  }) => axios.get(`${API_URL}/learning-outcome/academic-year?instructor_id=${userId}`),

  FetchAcademicYearClass:({
    userId
  }) => axios.get(`${API_URL}/learning-outcome/academic-year?instructor_id=${userId}`),

  FetchLOChart:({
    studentId,
    class_id
  }) => axios.get(`${API_URL}/learning-outcome/students/${studentId}/lo-chart?class_id=${class_id}`),


  FetchLOFinal:({
    type,
    studentId,
    class_id,
    final_exam_id
  }) => axios.get(`${API_URL}/learning-outcome/students/${studentId}/lo-chart?class_id=${class_id}&final_exam_id=${final_exam_id}&type=${type}`),

};

export { LearningOutcomeApi, handleLearningOutcomeApiError };
