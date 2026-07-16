import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

const TOKEN_KEY = "access_token";

export const login = async (email, password) => {
  const response = await AUTH_API.post("/login", {
    email,
    password,
  });

  const token = response.data.access_token;

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};