import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleDashboardApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.status === 404) return "Dịch vụ không tìm thấy.";
  if (error.status === 401) return "Không có quyền truy cập.";
  if (error.status === 400) return "Dữ liệu không hợp lệ.";
  return "Đã xảy ra lỗi.";
};

const dashboardApi = {
  fetchStatsCards: () => axios.get(`${API_URL}/dashboard/cards`),
  fetchSummary: ({ instructorId, courseId, academicYear }) => {
    if (courseId) {
      return axios.get(
        `${API_URL}/dashboard/summary?instructor_id=${instructorId}&course_id=${courseId}`
      );
    } else if (academicYear) {
      return axios.get(
        `${API_URL}/dashboard/summary?instructor_id=${instructorId}&academic_year=${academicYear}`
      );
    } else if (courseId && academicYear) {
      return axios.get(
        `${API_URL}/dashboard/summary?instructor_id=${instructorId}&course_id=${courseId}&academic_year=${academicYear}`
      );
    } else {
      return axios.get(
        `${API_URL}/dashboard/summary?instructor_id=${instructorId}`
      );
    }
  },
  fetchAvgScoreChart: () => axios.get(`${API_URL}/dashboard/avg_score_chart`),
  fetchAcademicRankData: () =>
    axios.get(`${API_URL}/dashboard/academic_rank_data`),
  fetchSubjects: () => axios.get(`${API_URL}/dashboard/subjects`),
};

export { dashboardApi, handleDashboardApiError };
