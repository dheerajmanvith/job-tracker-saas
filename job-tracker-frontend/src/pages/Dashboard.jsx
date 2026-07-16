import { useEffect } from "react";
import useApplicationStore from "../store/applicationStore";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

function Dashboard() {
  const loading = useApplicationStore((state) => state.loading);
  const error = useApplicationStore((state) => state.error);
  const filter = useApplicationStore((state) => state.filter);
  const page = useApplicationStore((state) => state.page);

  const fetchApplications = useApplicationStore(
    (state) => state.fetchApplications
  );
  const setFilter = useApplicationStore((state) => state.setFilter);
  const setPage = useApplicationStore((state) => state.setPage);

  const filteredApplications = useApplicationStore(
    (state) => state.filteredApplications
  );
  const paginatedApplications = useApplicationStore(
    (state) => state.paginatedApplications
  );
  const totalPages = useApplicationStore(
    (state) => state.totalPages
  );

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const applications = paginatedApplications();
  const total = filteredApplications().length;
  const pages = totalPages();

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>
        <strong>Total Applications:</strong> {total}
      </p>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="status-filter">
          <strong>Filter:</strong>
        </label>{" "}
        <select
          id="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="APPLIED">Applied</option>
          <option value="PHONE_SCREEN">Phone Screen</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <ApplicationTable applications={applications} />

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {pages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;