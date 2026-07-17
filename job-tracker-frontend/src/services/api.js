import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Separate plain axios instance for the refresh call itself,
// so it doesn't go through these same interceptors (avoids loops)
// and so it hits the root, not /api/v2.
const REFRESH_API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

// Request Interceptor — attach current access token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --- Refresh handling state ---
let isRefreshing = false;
let refreshQueue = []; // holds { resolve, reject, originalRequest }

const processQueue = (error, newToken = null) => {
  refreshQueue.forEach(({ resolve, reject, originalRequest }) => {
    if (error) {
      reject(error);
    } else {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      resolve(API(originalRequest));
    }
  });
  refreshQueue = [];
};

const forceLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/"; // login page lives at "/", not "/login"
};

// Response Interceptor — auto refresh access token on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        forceLogout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // queue this request until the in-flight refresh finishes
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject, originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await REFRESH_API.post(
          "/refresh",
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const newAccessToken = res.data.access_token;
        localStorage.setItem("access_token", newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        forceLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default API;