import axios from "axios";

const API_URL = import.meta.env.MODE === 'production'
    ? "https://bravimaserver.vercel.app"
    : "http://localhost:9090";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Session expired or unauthorized. Redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;