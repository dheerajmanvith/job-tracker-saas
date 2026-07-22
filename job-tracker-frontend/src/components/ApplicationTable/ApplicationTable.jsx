import React from "react";
import "./ApplicationTable.css";
import useApplicationStore from "../../store/applicationStore";

function ApplicationTable({ applications = [] }) {
  const updateStatus = useApplicationStore((state) => state.updateStatus);

  console.log("ApplicationTable rendered");

  if (!Array.isArray(applications)) {
    return <h3>Invalid application data.</h3>;
  }

  if (applications.length === 0) {
    return <h3>No applications found.</h3>;
  }

  return (
    <table className="application-table">
      <thead>
        <tr>
          <th>Company</th>
          <th>Role</th>
          <th>Status</th>
          <th>Notes</th>
        </tr>
      </thead>

      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td>{app.company}</td>

            <td>{app.role}</td>

            <td>
              <select
                value={app.status || "APPLIED"}
                onChange={(e) => updateStatus(app.id, e.target.value)}
              >
                <option value="APPLIED">Applied</option>
                <option value="PHONE_SCREEN">Phone Screen</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </td>

            <td>{app.notes || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(ApplicationTable);