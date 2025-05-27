import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

