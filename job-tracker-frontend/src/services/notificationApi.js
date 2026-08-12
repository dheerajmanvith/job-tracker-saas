import axios from "axios";

const API = axios.create({
  baseURL: "${import.meta.env.VITE_API_URL}/api/notifications",
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
