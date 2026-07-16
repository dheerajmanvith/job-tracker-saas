import "./ApplicationTable.css";

function ApplicationTable({ applications = [] }) {
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
          <th>Notes</th>
        </tr>
      </thead>

      <tbody>
        {applications.map((app) => (
          <tr key={app.id}>
            <td>{app.company}</td>
            <td>{app.role}</td>
            <td>{app.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ApplicationTable;