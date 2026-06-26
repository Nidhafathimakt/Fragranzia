import axios from "axios";

// In dev, Vite proxies /api and /uploads to the backend (see vite.config.js)
const isDev = import.meta.env.DEV;
const envUrl = import.meta.env.VITE_BACKEND_URL?.trim();

export const BASE_URL = isDev ? "" : envUrl || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});

export const getUploadUrl = (filename) => {
  if (!filename) return "/placeholder.png";
  const base = BASE_URL || "";
  return `${base}/uploads/${filename}`;
};

// Attach auth interceptors once (stable across hot reload)
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = token;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadAuth = error.config?.headers?.["Authorization"];
    if (
      hadAuth &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
