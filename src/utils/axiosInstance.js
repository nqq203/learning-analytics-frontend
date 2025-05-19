import axios from "axios";
import { useToken } from "../context/TokenProvider";

const API = axios.create({
  baseURL: "https://your-api.com",
});

export const setupAxiosInterceptors = (accessToken, refreshToken, setAccessToken) => {
  API.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401 && refreshToken) {
        try {
          const res = await axios.post("/api/auth/refresh", { refreshToken });
          setAccessToken(res.data.accessToken);
          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return API.request(error.config);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export default API;
