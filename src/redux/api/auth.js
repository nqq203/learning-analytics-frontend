import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);

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
    register: (data) => axios.post(`${API_URL}/auth/register`, data),
    login: (data) => axios.post(`${API_URL}/auth/login`, data),
    logout: () => {
        const state = store.getState();
        const accessToken = state?.auth?.accessToken;
        const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
        return axios.post(
            `${API_URL}/auth/logout`,
            null,
            { withCredentials: true, headers }
        );
    },
    refresh: () => axios.post(`${API_URL}/auth/refresh`),
}

export { authApi, handleAuthApiError };