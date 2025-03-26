import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, //base URL
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// Attach Authorization token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("SCREENCLASS-ADMIN-TOKEN"); // Retrieve token from localStorage or cookies
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
