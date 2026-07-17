import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const login = async (email, password) => {
  const response = await AUTH_API.post("/login", {
    email,
    password,
  });

  const { access_token, refresh_token } = response.data;

  if (access_token) {
    localStorage.setItem(TOKEN_KEY, access_token);
  }

  if (refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};