import useDebounce from "../hooks/useDebounce";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../components/NotificationBell";
import StatCard from "../components/StatCard";
import VirtualizedApplicationTable from "../components/VirtualizedApplicationTable";

const API = "http://127.0.0.1:5000/api/v2";

export default function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  const [stats, setStats] = useState({
    total: 0,
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  });

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const fetchDashboard = useCallback(async () => {
    if (!token) {
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [statsRes, appsRes] = await Promise.all([
        axios.get(`${API}/applications/stats`, { headers }),
        axios.get(`${API}/applications?per_page=5`, { headers }),
      ]);

      setStats(statsRes.data);

      setApplications(
        Array.isArray(appsRes.data.applications)
          ? appsRes.data.applications
          : []
      );
    } catch (err) {
      console.error("Dashboard Error:", err);

      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      }

      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  const filteredApplications = useMemo(() => {
    const keyword = debouncedSearch.toLowerCase();

    return applications.filter((app) => {
      const company = app.company?.toLowerCase() || "";
      const role = app.role?.toLowerCase() || "";

      return (
        company.includes(keyword) ||
        role.includes(keyword)
      );
    });
  }, [applications, debouncedSearch]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Job Tracker Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <NotificationBell />

          <button
            onClick={fetchDashboard}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Refresh
          </button>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
        <StatCard title="Total" value={stats.total} color="blue" />
        <StatCard title="Applied" value={stats.Applied} color="gray" />
        <StatCard title="Interview" value={stats.Interview} color="yellow" />
        <StatCard title="Offer" value={stats.Offer} color="green" />
        <StatCard title="Rejected" value={stats.Rejected} color="red" />
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Recent Applications
        </h2>

        {filteredApplications.length === 0 ? (
          <p className="text-gray-500">
            No applications found.
          </p>
        ) : (
          <VirtualizedApplicationTable
            applications={filteredApplications}
          />
        )}
      </div>
    </div>
  );
}