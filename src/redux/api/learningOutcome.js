import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
// console.log(process.env.NEXT_PUBLIC_API_URL);

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
};

export { LearningOutcomeApi, handleLearningOutcomeApiError };
