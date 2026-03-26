import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9090",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a response interceptor to handle 401 Unauthorized errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx causes this function to trigger
        if (error.response && error.response.status === 401) {
            // Optional: you can redirect to login page here or emit an event
            // e.g., window.location.href = '/login';
            console.warn('Session expired or unauthorized. Redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;