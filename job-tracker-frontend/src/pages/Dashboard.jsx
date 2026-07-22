import { useEffect, useState } from "react";
import axios from "axios";
import NotificationBell from "../components/NotificationBell";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:5000/api/v2";

export default function Dashboard() {
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

      {/* Header */}
      <div className="bg-white shadow px-8 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">
          Job Tracker Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <NotificationBell />

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-8">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500">
            Manage all your job applications from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-5 mb-10">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.total}
            </h2>
          </div>

          <div className="bg-blue-500 text-white rounded-xl shadow p-6">
            <p>Applied</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.Applied}
            </h2>
          </div>

          <div className="bg-yellow-500 text-white rounded-xl shadow p-6">
            <p>Interview</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.Interview}
            </h2>
          </div>

          <div className="bg-green-500 text-white rounded-xl shadow p-6">
            <p>Offer</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.Offer}
            </h2>
          </div>

          <div className="bg-red-500 text-white rounded-xl shadow p-6">
            <p>Rejected</p>
            <h2 className="text-4xl font-bold mt-2">
              {stats.Rejected}
            </h2>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">

          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            + Add Application
          </button>

          <button
            onClick={() => navigate("/applications")}
            className="bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-black"
          >
            View Applications
          </button>

          <button
            onClick={() => navigate("/jobs")}
            className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
          >
            Search Jobs
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700"
          >
            Analytics
          </button>

        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow">

          <div className="border-b p-5">
            <h2 className="text-xl font-bold">
              Recent Applications
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">Company</th>

                <th className="text-left p-4">Role</th>

                <th className="text-left p-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {applications.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="text-center p-8 text-gray-500"
                  >
                    No applications found
                  </td>

                </tr>

              ) : (

                applications.map((app) => (

                  <tr
                    key={app.id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {app.company}
                    </td>

                    <td className="p-4">
                      {app.role}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            app.status === "Applied"
                              ? "bg-blue-100 text-blue-700"
                              : app.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700"
                              : app.status === "Offer"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {app.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}