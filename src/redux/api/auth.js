import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

const handleAuthApiError = (error) => {
    if (error.message) {
        if (error && error.message) {
            return error.message;
        }
        if (error.status === 404) {
            return "Service not found. Please try again later.";
        }
        if (error.status === 401) {
            return "Invalid email or password";
        }
        if (error.status === 400) {
            return "Invalid input. Please check your details.";
        }
        return "Server error. Please try again later.";
    }
    return "Something went wrong. Please try again.";
};

const authApi = {
    register: (data) => axiosInstance.post(`${API_URL}/auth/register`, data),
    login: (data) => axiosInstance.post(`${API_URL}/auth/login`, data),
    logout: () => axiosInstance.post(`${API_URL}/auth/logout`),
    refresh: () => axiosInstance.post(`${API_URL}/auth/refresh`),
}

export { authApi, handleAuthApiError };