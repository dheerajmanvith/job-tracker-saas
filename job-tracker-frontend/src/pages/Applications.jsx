import { useMemo, useState } from "react";

import SearchBar from "../components/SearchBar";
import ApplicationTable from "../components/ApplicationTable";
import Pagination from "../components/Pagination";
import ExportButton from "../components/ExportButton";

import useApplications from "../hooks/useApplications";

function Applications() {
  const {
    applications,
    loading,
    error,
  } = useApplications();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const query = search.toLowerCase();

      return (
        app.company.toLowerCase().includes(query) ||
        app.role.toLowerCase().includes(query)
      );
    });
  }, [applications, search]);

  const totalPages = Math.ceil(
    filteredApplications.length / ITEMS_PER_PAGE
  );

  const paginatedApplications = filteredApplications.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Applications
      </h1>

      <ExportButton
        applications={filteredApplications}
      />

      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {loading && <p>Loading...</p>}

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <ApplicationTable
            applications={paginatedApplications}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}

export default Applications;