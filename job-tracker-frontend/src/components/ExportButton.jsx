import { CSVLink } from "react-csv";

function ExportButton({ applications }) {
  const headers = [
    { label: "Company", key: "company" },
    { label: "Role", key: "role" },
    { label: "Status", key: "status" },
  ];

  return (
    <div className="mb-4 flex justify-end">
      <CSVLink
        data={applications}
        headers={headers}
        filename="applications.csv"
        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Export CSV
      </CSVLink>
    </div>
  );
}

export default ExportButton;