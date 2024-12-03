import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILWAYS_API_URL, // URL gốc của API
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Timeout sau 10 giây
});

// Request Interceptor: Add Authorization Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Simplify response and handle errors
axiosClient.interceptors.response.use(
  (response) => response?.data ?? response, // Trả về `data` hoặc toàn bộ response
  (error) => {
    // Xử lý lỗi chi tiết
    if (error.code === "ECONNABORTED") {
      return Promise.reject({
        message: "Request timed out. Please try again.",
      });
    }
    const status = error.response?.status;
    const message =
      status === 401
        ? "Unauthorized access. Please login again."
        : error.response?.data?.message || "Something went wrong.";
    return Promise.reject({ status, message });
  }
);

export default axiosClient;
