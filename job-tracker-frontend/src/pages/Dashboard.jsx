import { useEffect, useState } from "react";
import axios from "axios";
import NotificationBell from "../components/NotificationBell";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:5000/api/v2";

export default function Dashboard() {
  // 🔥 Temporary: Test the Error Boundary
  throw new Error("Testing Error Boundary");

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  });

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [statsRes, appsRes] = await Promise.all([
        axios.get(`${API}/applications/stats`, { headers }),
        axios.get(`${API}/applications?per_page=5`, { headers }),
      ]);

      setStats(statsRes.data);
      setApplications(appsRes.data.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Your existing dashboard UI */}
    </div>
  );
}