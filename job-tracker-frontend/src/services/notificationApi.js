import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/notifications",
});

API.interceptors.request.use((config) => {
  config.headers.Authorization =
    `Bearer ${localStorage.getItem("access_token")}`;

  return config;
});

export default {
  getNotifications: async () => {
    const res = await API.get("");
    return res.data;
  },

  getUnreadCount: async () => {
    const res = await API.get("/unread-count");
    return res.data;
  },

  markAsRead: async (id) => {
    return API.put(`/${id}/read`);
  },
};