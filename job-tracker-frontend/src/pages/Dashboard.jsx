import { useState } from "react";
import JobSearchBar from "../components/JobSearch/JobSearchBar";
import JobList from "../components/JobSearch/JobList";
import { searchJobs } from "../services/jobSearchService";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query, location) => {
    try {
      setLoading(true);
      setError("");

      console.log("Searching:", query, location);

      const data = await searchJobs(query, location);

      console.log("Response:", data);

      setJobs(data);
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(err.response.data.error || "Failed to fetch jobs.");
      } else {
        setError("Unable to connect to the server.");
      }

      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>Job Search</h1>

      <JobSearchBar onSearch={handleSearch} />

      {loading && (
        <p>Loading jobs...</p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading && jobs.length > 0 && (
        <h3>
          {jobs.length} Jobs Found
        </h3>
      )}

      {!loading && jobs.length === 0 && !error && (
        <p>Search for jobs above.</p>
      )}

      <JobList jobs={jobs} />
    </div>
  );
}