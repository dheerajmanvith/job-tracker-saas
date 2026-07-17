import { useEffect, useState } from "react";
import API from "../services/api";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import ApplicationsBarChart from "../components/analytics/ApplicationsBarChart";
import StatusPieChart from "../components/analytics/StatusPieChart";
import AnalyticsSkeleton from "../components/analytics/AnalyticsSkeleton";

function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    API.get("/api/v2/analytics")
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        if (isMounted) {
          setError(
            err.response?.status
              ? `${err.response.status}: ${err.response.data?.msg || "Failed to load analytics"}`
              : "Network error"
          );
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <AnalyticsSkeleton />;

  if (error) {
    return (
      <div style={{ padding: "20px", color: "white" }}>
        <h1>Analytics</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Analytics</h1>
      <AnalyticsCards data={data} />
      <ApplicationsBarChart data={data} />
      <StatusPieChart data={data} />
    </div>
  );
}

export default Analytics;