import { useState, useCallback } from "react";
import JobSearchBar from "../components/JobSearch/JobSearchBar";
import JobList from "../components/JobSearch/JobList";
import LoadMoreButton from "../components/JobSearch/LoadMoreButton";
import { searchJobs } from "../services/jobSearchService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useState({
    query: "",
    location: "",
  });

  const handleSearch = useCallback(async (params) => {
    setLoading(true);

    try {
      const data = await searchJobs(params);

      setJobs(data.jobs || data.results || []);

      setSearchParams({
        query: params.query,
        location: params.location,
      });

      setPage(1);
    } catch (error) {
      console.error(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLoadMore = async () => {
    const nextPage = page + 1;

    setLoading(true);

    try {
      const data = await searchJobs({
        ...searchParams,
        page: nextPage,
      });

      setJobs((prev) => [
        ...prev,
        ...(data.jobs || data.results || []),
      ]);

      setPage(nextPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = (job) => {
    console.log("Track:", job);
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Job Search
      </h1>

      <JobSearchBar onSearch={handleSearch} />

      {loading && (
        <p className="mb-4 text-gray-500">
          Searching...
        </p>
      )}

      <JobList jobs={jobs} onTrack={handleTrack} />

      {jobs.length > 0 && (
        <LoadMoreButton
          onClick={handleLoadMore}
          loading={loading}
        />
      )}
    </div>
  );
}

export default Jobs;