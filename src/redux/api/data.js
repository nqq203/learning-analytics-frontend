import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleDataApiError = (error) => {
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
        if (error.status === 422) {
            return "Error processing file";
        }
        return "Server error. Please try again later.";
    }
    return "Something went wrong. Please try again.";
}

const dataApi = {
    fetchClassList: ({
        instructorId,
        page,
        amount,
    }) => axios.get(`${API_URL}/data/classes?instructor_id=${instructorId}&page=${page}&amount=${amount}`),
    fetchClassDetail: ({
        instructorId, classId
    }) => axios.get(`${API_URL}/data/classes/${classId}?instructor_id=${instructorId}`),
    fetchAllFaculties: ({
        instructorId
    }) => axios.get(`${API_URL}/data/faculties?instructor_id=${instructorId}`),
    fetchAllMajors: ({
        instructorId
    }) => axios.get(`${API_URL}/data/majors?instructor_id=${instructorId}`),
    fetchAllPrograms: ({
        instructorId
    }) => axios.get(`${API_URL}/data/programs?instructor_id=${instructorId}`),
    createFaculty: ({
        instructorId,
        data
    }) => axios.post(`${API_URL}/data/faculties?instructor_id=${instructorId}`, data),
    createMajor: ({
        instructorId,
        data
    }) => axios.post(`${API_URL}/data/majors?instructor_id=${instructorId}`, data),
    createProgram: ({
        instructorId,
        data
    }) => axios.post(`${API_URL}/data/programs?instructor_id=${instructorId}`, data),
    updateClass: ({
        instructorId,
        data
    }) => axios.put(`${API_URL}/data/classes?instructor_id=${instructorId}`, data),
    createClass: ({
        instructorId,
        data,
    }) => axios.post(`${API_URL}/data/classes?instructor_id=${instructorId}`, data),
    deleteClass: ({
        classId
    }) => axios.delete(`${API_URL}/classes/delete/${classId}`),
}

export { dataApi, handleDataApiError }