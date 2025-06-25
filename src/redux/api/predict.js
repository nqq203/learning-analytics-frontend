import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const predictApi = {
  predictGradesBatch: (payload) =>
    axios.post(`${API_URL}/predict/grades_batch`, payload),
};

export { predictApi };
