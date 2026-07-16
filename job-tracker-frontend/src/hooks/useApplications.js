import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";

export default function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      try {
        const response = await getApplications();
        console.log("API Response:", response);
        setApplications(response.applications);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  return {
    applications,
    loading,
    error,
  };
}