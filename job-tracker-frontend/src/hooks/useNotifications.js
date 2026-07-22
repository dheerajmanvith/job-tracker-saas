import { useEffect, useState } from "react";
import { toast } from "sonner";

import notificationApi from "../services/notificationApi";

function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    try {
      const data = await notificationApi.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const data = await notificationApi.getUnreadCount();
      setUnreadCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (id) => {
    await notificationApi.markAsRead(id);

    loadNotifications();
    loadUnreadCount();
  };

  useEffect(() => {
    loadNotifications();
    loadUnreadCount();

    const token = localStorage.getItem("access_token");

    if (!token) return;

    let previousCount = 0;

    const eventSource = new EventSource(
      `http://127.0.0.1:5000/api/notifications/stream?token=${token}`
    );

    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.unread_count > previousCount) {
        await loadNotifications();

        toast.success("🔔 You have a new notification!");
      }

      previousCount = data.unread_count;

      setUnreadCount(data.unread_count);

      loadNotifications();
    };

    eventSource.onerror = () => {
      console.log("Notification stream disconnected");

      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
  };
}

export default useNotifications;