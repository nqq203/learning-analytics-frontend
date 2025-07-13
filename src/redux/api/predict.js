import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const predictApi = {
  predictGradesBatch: (payload, config = {}) =>
    axios.post(`${API_URL}/predict/grades_batch`, payload, config),
};

export { predictApi };
