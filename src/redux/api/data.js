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
        search = null,
        academicYear = null,
        semester = null,
    }) => axios.get(`${API_URL}/data/classes?instructor_id=${instructorId}&page=${page}&amount=${amount}&search=${search}&academic_year=${academicYear}&semester=${semester}`),
    fetchClassDetail: ({
        instructorId, classId
    }) => axios.get(`${API_URL}/data/classes/${classId}?instructor_id=${instructorId}`),
    fetchAllFaculties: ({
        instructorId,
        search = null,
    }) => axios.get(`${API_URL}/data/faculties?instructor_id=${instructorId}&search=${search}`),
    fetchAllMajors: ({
        instructorId,
        search = null,
    }) => axios.get(`${API_URL}/data/majors?instructor_id=${instructorId}&search=${search}`),
    fetchAllPrograms: ({
        instructorId,
        search = null,
    }) => axios.get(`${API_URL}/data/programs?instructor_id=${instructorId}&search=${search}`),
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
        classId,
        data
    }) => axios.put(`${API_URL}/data/classes/${classId}?instructor_id=${instructorId}`, data),
    createClass: ({
        instructorId,
        data,
    }) => axios.post(`${API_URL}/data/classes?instructor_id=${instructorId}`, data),
    deleteClass: ({
        classId
    }) => axios.delete(`${API_URL}/classes/delete/${classId}`),
    createCourse: ({
        instructorId,
        data
    }) => axios.post(`${API_URL}/data/courses?instructor_id=${instructorId}`, data),
    fetchAllCourses: ({
        instructorId,
        search = null,
    }) => axios.get(`${API_URL}/data/courses?instructor_id=${instructorId}&search=${search}`),
    processAllData: ({ instructorId, file }) => {
        const form = new FormData();
        form.append("file", file);
        return axios.post(
            `${API_URL}/data/all?instructor_id=${instructorId}`,
            form,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
    },
    processCourseData: ({ instructorId, file }) => {
        const form = new FormData();
        form.append("file", file);
        return axios.post(
            `${API_URL}/data/course-information?instructor_id=${instructorId}`,
            form,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
    },
    processFilePartly: ({ instructorId, replace = false, classId, activityType, file }) => {
        const form = new FormData();
        form.append("file", file);
        form.append("replace", replace);
        form.append("class_id", classId);
        form.append("activity_type", activityType);
        return axios.post(
            `${API_URL}/data/part?instructor_id=${instructorId}`,
            form,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
    },
    processStudentInformation: ({ instructorId, classId, file }) => {
        const form = new FormData();
        form.append("file", file);
        return axios.post(
            `${API_URL}/data/student-information?instructor_id=${instructorId}&class_id=${classId}`,
            form,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
    },
    getAcademicYear: ({ instructorId }) =>
        axios.get(`${API_URL}/learning-outcome/academic-year?instructor_id=${instructorId}`),
    getSemester: ({ instructorId }) =>
        axios.get(`${API_URL}/data/semesters?instructor_id=${instructorId}`),
    deleteFaculty: ({ facultyId, instructorId }) =>
        axios.delete(`${API_URL}/data/faculties/${facultyId}?instructor_id=${instructorId}`),
    deleteMajor: ({ majorId, instructorId }) =>
        axios.delete(`${API_URL}/data/majors/${majorId}?instructor_id=${instructorId}`),
    deleteCourse: ({ courseId, instructorId }) =>
        axios.delete(`${API_URL}/data/courses/${courseId}?instructor_id=${instructorId}`),
    deleteProgram: ({ programId, instructorId }) =>
        axios.delete(`${API_URL}/data/programs/${programId}?instructor_id=${instructorId}`),
    updateProgram: ({ programId, payload, instructorId }) =>
        axios.put(`${API_URL}/data/programs/${programId}?instructor_id=${instructorId}`, payload),
    updateFaculty: ({ facultyId, payload, instructorId }) =>
        axios.put(`${API_URL}/data/faculties/${facultyId}?instructor_id=${instructorId}`, payload),
    updateMajor: ({ majorId, payload, instructorId }) =>
        axios.put(`${API_URL}/data/majors/${majorId}?instructor_id=${instructorId}`, payload),
    updateCourse: ({ courseId, payload, instructorId }) =>
        axios.put(`${API_URL}/data/courses/${courseId}?instructor_id=${instructorId}`, payload),
    fetchStudentList: ({ classId, type = "information", page, amount, search }) =>
        axios.get(`${API_URL}/data/students?class_id=${classId}&type=${type}&page=${page}&amount=${amount}&search=${search}`),
    createStudent: ({ classId, payload }) =>
        axios.post(`${API_URL}/data/students?class_id=${classId}`, payload),
    updateStudent: ({ studentId, classId, payload }) =>
        axios.put(`${API_URL}/data/students/${studentId}?class_id=${classId}`, payload),
    fetchStudentDetail: ({ studentId, classId }) =>
        axios.get(`${API_URL}/data/students/${studentId}?class_id=${classId}`),
    deleteStudentFromClass: ({ studentId, classId }) =>
        axios.delete(`${API_URL}/data/students/${studentId}?class_id=${classId}`)

}

export { dataApi, handleDataApiError }